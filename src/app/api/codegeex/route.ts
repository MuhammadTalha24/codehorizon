import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { cursorText, language } = await req.json();

    // Updated prompt to focus on code completion at the cursor
    const prompt = `You are a code completion engine. Given the following ${language} code up to the cursor position, provide 5 concise code completions that continue from the cursor. Return only the raw code completions, one per line, without numbering, backticks, or markdown formatting. Do not repeat the input code or include the code before the cursor in the suggestions.

Code:
${cursorText}

Completions:`;

    const apiRes = await fetch('https://modelslab.com/api/uncensored-chat/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer dzNt0JlHxJOAPSZzrKmkLuzM4S4rp0L7SpDTRekneicxV3UdKZREWqm6Tbx1', // Use environment variable
        
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a strict code completion engine. Always reply with raw code suggestions only, one per line, without numbering, backticks, or markdown formatting.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.4,
      }),
    });

    const json = await apiRes.json();
    const content = json?.choices?.[0]?.message?.content || '';

    // Clean suggestions: Remove numbering, backticks, and extra whitespace
    const suggestions = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('```')) // Remove markdown code block delimiters
      .map(line =>
        line
          .replace(/^\d+\.\s*/g, '') // Remove "1.", "2.", etc.
          .replace(/```/g, '') // Remove any remaining backticks
          .replace(/^`|`$/g, '') // Remove single backticks at start/end
          .trim() // Remove extra whitespace
      )
      .filter(line => line); // Remove empty lines

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}