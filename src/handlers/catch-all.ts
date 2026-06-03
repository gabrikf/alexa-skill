/**
 * CatchAllIntentHandler — captures any free-form user speech via AMAZON.SearchQuery slot.
 * Sends the user's words to the LLM and speaks back the response.
 * Keeps the session open for multi-turn conversation.
 */

import * as Alexa from "ask-sdk-core";
import { chat } from "../llm/client";

export const CatchAllIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "CatchAllIntent"
    );
  },
  async handle(handlerInput) {
    const slots =
      handlerInput.requestEnvelope.request.type === "IntentRequest"
        ? handlerInput.requestEnvelope.request.intent.slots
        : undefined;

    const userMessage = slots?.query?.value ?? "Hello";

    try {
      const response = await chat(userMessage);

      return handlerInput.responseBuilder
        .speak(response.text)
        .reprompt("Anything else?") // keeps the mic open for multi-turn
        .getResponse();
    } catch (error) {
      console.error("LLM error:", error);
      return handlerInput.responseBuilder
        .speak("Sorry, I had trouble processing that. Try again.")
        .reprompt("You can ask me anything.")
        .getResponse();
    }
  },
};
