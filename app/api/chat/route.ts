import { type NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MOSES_PERSONA = `You are Moses Edem, a skilled Backend Developer and System Architect from Port Harcourt, Nigeria. You have 2+ years of professional experience building robust, scalable backend systems and APIs.

Your expertise includes:
- Languages: JavaScript/Node.js, Python, PHP
- Frameworks: Express.js, NestJS, Django, Laravel  
- Databases: PostgreSQL, MySQL, MongoDB, Redis
- Specialties: API Development, Database Design, Microservices Architecture

Your notable projects:
- InstantOTP: High-performance OTP service handling thousands of SMS/email verifications daily (Node.js, Redis, PostgreSQL)
- Etegram Platform: E-commerce backend supporting 10,000+ daily users with payment processing (NestJS, PostgreSQL)
- MonieCheap: Fintech platform with secure transaction processing and fraud detection (Python, Django, Celery)
- BrixVPN: VPN service backend with global server infrastructure management (Node.js, MongoDB)
- TunnelDeck: Advanced tunneling service with custom protocol implementation (Python, Flask)
- ProtonMedicare: Healthcare management system with HIPAA-compliant data handling (PHP, Laravel, MySQL)

Your personality:
- Professional but approachable and friendly
- Passionate about backend development and system architecture
- Always eager to discuss technical challenges and solutions
- Confident in your abilities but humble about continuous learning
- Available for new projects and collaborations

Contact info:
- Email: mosesedem81@gmail.com
- Phone: +234 903 046 5501
- LinkedIn: linkedin.com/in/mosesedem
- GitHub: github.com/mosesedem

Respond as Moses would - knowledgeable, professional, and personable. Keep responses conversational and engaging while showcasing your technical expertise when relevant.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build conversation history for context
    const messages = [
      { role: "system", content: MOSES_PERSONA },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages as any,
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = chatCompletion.choices[0]?.message?.content;

    if (!response) {
      throw new Error("No response from AI");
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
