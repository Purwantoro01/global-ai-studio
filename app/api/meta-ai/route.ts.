import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const metaResponse = await fetch('https://meta.ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.META_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'muse-spark-1.3',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const metaData = await metaResponse.json();
    const aiReply = metaData.choices?.[0]?.message?.content || 'No response from AI.';

    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Global AI Studio Notifier',
          content: `**Aktivitas Baru**\n**Input:** ${prompt.slice(0, 300)}\n**Hasil AI:** ${aiReply.slice(0, 1000)}`,
        }),
      });
    }

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
