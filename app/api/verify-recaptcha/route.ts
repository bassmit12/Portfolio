// app/api/verify-recaptcha/route.ts
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import * as path from "path";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    console.log(
      "Received token for verification:",
      token.substring(0, 20) + "...",
    );

    let client;

    // Check if we're on Vercel (production)
    if (process.env.VERCEL) {
      // Use environment variable credentials on Vercel
      const credentials = JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "{}",
      );
      client = new RecaptchaEnterpriseServiceClient({
        credentials,
        projectId: "bassmitdev-1738625013031",
      });
    } else {
      // Use local file in development
      client = new RecaptchaEnterpriseServiceClient({
        keyFilename: path.join(
          process.cwd(),
          "credentials",
          "recaptcha-key.json",
        ),
        projectId: "bassmitdev-1738625013031",
      });
    }

    console.log("Created reCAPTCHA client");

    const projectPath = client.projectPath("bassmitdev-1738625013031");
    console.log("Project path:", projectPath);

    console.log("Creating assessment...");
    const [response] = await client.createAssessment({
      assessment: {
        event: {
          token,
          siteKey: "6Ldn9csqAAAAAEJggqDQSTp7yXzZSlbW13a09s3Y",
          expectedAction: "submit_contact",
        },
      },
      parent: projectPath,
    });

    console.log("Got assessment response:", response);

    if (!response.tokenProperties?.valid) {
      console.error("Invalid token:", response.tokenProperties?.invalidReason);
      return Response.json({
        success: false,
        error: `Invalid token: ${response.tokenProperties?.invalidReason}`,
      });
    }

    if (response.tokenProperties.action !== "submit_contact") {
      console.error("Action mismatch:", {
        expected: "submit_contact",
        received: response.tokenProperties.action,
      });
      return Response.json({
        success: false,
        error: "Action mismatch",
      });
    }

    const score = response.riskAnalysis?.score ?? 0;
    const isHuman = score > 0.5;
    console.log("Assessment result:", { score, isHuman });

    return Response.json({
      success: true,
      score,
      isHuman,
      tokenProperties: response.tokenProperties,
      riskAnalysis: response.riskAnalysis,
    });
  } catch (error: unknown) {
    // Type guard for Error object
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error("Detailed reCAPTCHA verification error:", {
      message: errorMessage,
      stack: errorStack,
      error,
    });

    return Response.json({
      success: false,
      error: `Failed to verify reCAPTCHA: ${errorMessage}`,
    });
  }
}
