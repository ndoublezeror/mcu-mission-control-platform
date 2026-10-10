import { gateway } from '@ai-sdk/gateway'
import { generateText } from 'ai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json() as { messages?: Array<{ role: 'user' | 'assistant'; content: string }> }
    if (!Array.isArray(messages) || messages.length === 0) return NextResponse.json({ error: 'A message is required.' }, { status: 400 })
    const result = await generateText({
      model: gateway('openai/gpt-4.1-mini'),
      system: 'You are Mission Control, a concise Marvel movie guide. Help with viewing orders, the official Disney+ Doomsday selection, and recommendations. Clearly distinguish official Disney+ picks from fan recommendations. Never claim every official pick is mandatory. Use the user conversation as context.',
      messages,
    })
    return NextResponse.json({ text: result.text })
  } catch {
    return NextResponse.json({ error: 'The Marvel Guide is unavailable. Check that Vercel AI Gateway is connected.' }, { status: 503 })
  }
}
