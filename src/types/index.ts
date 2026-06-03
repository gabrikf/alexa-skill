/**
 * Shared TypeScript types used across the project.
 * Add new interfaces here as the project grows.
 */

/** Represents a single message in a conversation with the LLM */
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/** Result returned from the LLM provider */
export interface LLMResponse {
  text: string;
}
