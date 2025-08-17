import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Use Web Speech API synthesis (browser-based)
    // Since Groq doesn't have TTS, we'll return a simple response
    // The client will handle TTS using browser's speechSynthesis API

    return NextResponse.json({
      message: "TTS not implemented server-side. Using browser TTS.",
      text,
    });
  } catch (error) {
    console.error("Text-to-speech error:", error);
    return NextResponse.json(
      { error: "Failed to process text-to-speech" },
      { status: 500 }
    );
  }
}
