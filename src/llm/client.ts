/**
 * LLM client setup using Vercel AI SDK with OpenRouter as the provider.
 * This module exposes a single function to generate text from a user message.
 * It's designed to be extended later with tool calling (MCP) support —
 * Vercel AI SDK's `generateText` already supports a `tools` parameter.
 */

import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { config } from "../config/env";
import type { LLMResponse } from "../types";

/** OpenRouter provider configured via Vercel AI SDK's OpenAI-compatible adapter */
const openrouter = createOpenAICompatible({
  name: "openrouter",
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: config.openRouterApiKey,
});

/**
 * Sends a user message to the LLM and returns the generated text.
 * Later, you can add a `tools` parameter here to enable MCP tool calling.
 */
export async function chat(userMessage: string): Promise<LLMResponse> {
  const { text } = await generateText({
    model: openrouter(config.model),
    system:
      "You are a helpful voice assistant called via Alexa. " +
      "Always respond in the same language the user speaks. " +
      "If the user speaks in Portuguese, respond in Brazilian Portuguese (pt-BR). " +
      "If the user speaks in English, respond in English. " +
      "Keep responses concise and conversational — ideally under 3 sentences. " +
      "The user is listening, not reading, so be natural and direct.",
    messages: [{ role: "user", content: userMessage }],
    // Ready for MCP tools: just add `tools: { ... }` here when needed
  });

  return { text };
}
