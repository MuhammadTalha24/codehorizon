import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { cursorText, language } = await req.json();

    const prompt = `
You are a code completion engine. Given the following ${language} code written so far, continue it from the current position with 5 short and relevant code completions. Do not repeat any part of the existing code. Just provide raw code suggestions only — no numbering, no formatting, no markdown, and no explanations.

CODE BEFORE CURSOR:
${cursorText}

SUGGESTIONS:
`;

    const apiRes = await fetch('https://modelslab.com/api/uncensored-chat/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer dzNt0JlHxJOAPSZzrKmkLuzM4S4rp0L7SpDTRekneicxV3UdKZREWqm6Tbx1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a strict code completion engine. Reply with only raw code lines. No markdown, no numbering.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
      }),
    });

    const json = await apiRes.json();
    const content = json?.choices?.[0]?.message?.content || '';

    const suggestions = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('```') && !line.startsWith('//'))
      .map(line =>
        line.replace(/^\d+\.\s*/, '').replace(/`/g, '').trim()
      );

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Suggestion API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });

    
  }
}
