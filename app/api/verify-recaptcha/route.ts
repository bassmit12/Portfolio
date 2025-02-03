import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Initialize the client with credentials from environment variables
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_CLOUD_CREDENTIALS!, "base64").toString(),
    );

    const client = new RecaptchaEnterpriseServiceClient({
      credentials,
    });

    const projectPath = client.projectPath(
      process.env.GOOGLE_CLOUD_PROJECT_ID!,
    );

    const [response] = await client.createAssessment({
      assessment: {
        event: {
          token,
          siteKey: process.env.RECAPTCHA_SITE_KEY,
          expectedAction: "submit_contact",
        },
      },
      parent: projectPath,
    });

    if (!response.tokenProperties?.valid) {
      return Response.json({
        success: false,
        error: `Invalid token: ${response.tokenProperties?.invalidReason}`,
      });
    }

    if (response.tokenProperties.action !== "submit_contact") {
      return Response.json({
        success: false,
        error: "Action mismatch",
      });
    }

    const score = response.riskAnalysis?.score ?? 0;
    const isHuman = score > 0.5;

    return Response.json({
      success: true,
      score,
      isHuman,
    });
  } catch (error) {
    console.error("ReCAPTCHA verification error:", error);
    return Response.json({
      success: false,
      error: "Failed to verify reCAPTCHA",
    });
  }
}
