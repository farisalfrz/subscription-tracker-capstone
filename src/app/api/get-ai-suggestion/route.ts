import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ detail: 'Prompt is required' }, { status: 400 });
    }

    const output = await replicate.run(
      "ibm-granite/granite-3.3-8b-instruct", 
      {
        input: { 
          prompt: prompt,
          max_new_tokens: 300 
        }
      }
    );

    return NextResponse.json({ output }, { status: 200 });

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ detail: errorMessage }, { status: 500 });
  }
}