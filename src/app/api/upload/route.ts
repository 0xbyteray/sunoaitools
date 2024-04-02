import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request, res: Response) {
	const formData = await req.formData();
	const image = formData.get("image");

	if (!image) {
		return new Response(null, {
			headers: { "Content-Type": "application/json" },
			status: 404
		});
	}

	console.log("start...")
	const completion = await openai.chat.completions.create({
		messages: [{ "role": "system", "content": "You are a helpful assistant." }, { "role": "user", "content": "Tell me about you." }],
		model: "gpt-3.5-turbo",
	});

	console.log(completion.choices[0].message.content);

	return new Response(JSON.stringify({ description: completion.choices[0].message.content }), {
		headers: { "Content-Type": "application/json" },
		status: 200
	});
}

async function send_chat_request() {
	const endpoint = "https://api.openai.com/v1/chat/completions";
	const api_key = process.env.OPENAI_API_KEY;

	let payload = {
		"model": "gpt-3.5-turbo-0125",
		"messages": [{ "role": "system", "content": "You are a helpful assistant." }, { "role": "user", "content": "Tell me about you." }],
		// "image": { image }
	}

	let options = {
		"method": "post",
		"headers": {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${api_key}`
		},
		"payload": JSON.stringify(payload)
	}

	console.log(options);

	let data = await fetch(endpoint, options)
		.then(r => r.json()).catch(e => console.error(e));

	// let output = data.choices[0].message.content;

	return data;
}