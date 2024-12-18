import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        status: 403,
        statusText: "API key is required.",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
  });

  try {
    const { contents } = await req.json();

    if (!contents || !Array.isArray(contents)) {
      return new Response(
        JSON.stringify({
          status: 422,
          statusText: "Invalid request body.",
        }),
        { status: 422, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await model.generateContentStream({ contents });

    if (!result || !result.stream) {
      throw new Error("Failed to generate content or missing result stream");
    }

    // Create a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(chunk.text());
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, { headers: { "Content-Type": "text/plain" } });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        status: 500,
        statusText: error.message || "Internal server error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
