/**
 * Environment variables and configuration constants.
 * Centralizes all env var access so the rest of the app never reads process.env directly.
 */

export const config = {
  /** OpenRouter API key — injected via CDK environment variables */
  openRouterApiKey: process.env.OPENROUTER_API_KEY ?? "",

  /** LLM model to use (OpenRouter format, e.g. "openai/gpt-4o-mini") */
  model: process.env.LLM_MODEL ?? "openai/gpt-4o-mini",
} as const;
