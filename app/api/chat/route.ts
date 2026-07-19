import { type NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { buildChatSystemPrompt } from "@/lib/chat-prompts";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Chat is not configured (missing GROQ_API_KEY)." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const message = body?.message as string | undefined;
    const history = Array.isArray(body?.history) ? body.history : [];
    const persona = typeof body?.persona === "string" ? body.persona : "visitor";

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const systemPrompt = buildChatSystemPrompt(persona);

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...history
        .filter(
          (msg: { role?: string; content?: string }) =>
            msg &&
            (msg.role === "user" || msg.role === "assistant") &&
            typeof msg.content === "string"
        )
        .map((msg: { role: "user" | "assistant"; content: string }) => ({
          role: msg.role,
          content: msg.content,
        })),
      { role: "user" as const, content: message },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 700,
    });

    const response = chatCompletion.choices[0]?.message?.content;
    if (!response) throw new Error("No response from AI");

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
