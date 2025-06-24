import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	const { prompt } = await req.json();

	const completion = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [{ role: "user", content: prompt }],
	});

	return NextResponse.json({ result: completion.choices[0].message });
}
