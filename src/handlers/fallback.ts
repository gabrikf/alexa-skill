/**
 * FallbackIntentHandler — handles AMAZON.FallbackIntent.
 * This is triggered when Alexa can't match the user's speech to any defined intent.
 * We redirect to the LLM as well, treating it the same as CatchAllIntent.
 */

import * as Alexa from "ask-sdk-core";
import { chat } from "../llm/client";

export const FallbackIntentHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.FallbackIntent"
    );
  },
  async handle(handlerInput) {
    try {
      const response = await chat(
        "The user said something I couldn't understand. Ask them to repeat.",
      );

      return handlerInput.responseBuilder
        .speak(response.text)
        .reprompt("I'm listening.")
        .getResponse();
    } catch (error) {
      console.error("LLM error in fallback:", error);
      return handlerInput.responseBuilder
        .speak("I didn't catch that. Could you say it again?")
        .reprompt("I'm still here. What can I help you with?")
        .getResponse();
    }
  },
};
