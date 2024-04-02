import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request, res: Response) {
	const formData = await req.formData();
	const base64_image = formData.get("image");

	if (!base64_image) {
		return new Response(null, {
			headers: { "Content-Type": "application/json" },
			status: 405
		});
	}

	const completion = await openai.chat.completions.create({
		messages: [{
			"role": "user", "content": [{
				"type": "text",
				"text": "What are in these images? Is there any difference between them?",
			}, {
				"type": "image_url", "image_url": {
					"url": base64_image.toString()
				}
			}]
		}],
		model: "gpt-4-vision-preview",
	});

	console.log(completion.choices[0].message.content);

	return new Response(JSON.stringify({ description: completion.choices[0].message.content }), {
		headers: { "Content-Type": "application/json" },
		status: 200
	});
}