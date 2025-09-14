import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

// Initialize the Replicate client with your API token from environment variables
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// This is the API route handler for POST requests
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body to get the prompt
    const { prompt } = await req.json();

    // If no prompt is provided, return a 400 Bad Request response
    if (!prompt) {
      return NextResponse.json(
        { detail: "Prompt is required" },
        { status: 400 }
      );
    }

    // Call the Replicate API to run the IBM Granite model with the provided prompt
    const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", {
      input: {
        prompt: prompt,
        max_new_tokens: 300, // Limit the response length
      },
    });

    // Return the model output as a JSON response with status 200 OK
    return NextResponse.json({ output }, { status: 200 });
  } catch (error) {
    // Log any errors and return a 500 Internal Server Error response
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}
