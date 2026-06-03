/**
 * CatchAllIntentHandler — captures any free-form user speech via AMAZON.SearchQuery slot.
 * Sends the user's words to the LLM and speaks back the response.
 * After responding, re-elicits the slot so the user can keep talking without a carrier phrase.
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

    const locale = handlerInput.requestEnvelope.request.locale ?? "en-US";
    const isPt = locale.startsWith("pt");

    try {
      const response = await chat(userMessage);

      return handlerInput.responseBuilder
        .speak(response.text)
        .reprompt(isPt ? "Estou ouvindo." : "I'm listening.")
        .addElicitSlotDirective("query", {
          name: "CatchAllIntent",
          confirmationStatus: "NONE",
          slots: {
            query: {
              name: "query",
              value: "",
              confirmationStatus: "NONE",
            },
          },
        })
        .getResponse();
    } catch (error) {
      console.error("LLM error:", error);
      return handlerInput.responseBuilder
        .speak(
          isPt
            ? "Desculpa, tive um problema ao processar isso. Tenta de novo."
            : "Sorry, I had trouble processing that. Try again.",
        )
        .reprompt(
          isPt
            ? "Pode me perguntar qualquer coisa."
            : "You can ask me anything.",
        )
        .addElicitSlotDirective("query", {
          name: "CatchAllIntent",
          confirmationStatus: "NONE",
          slots: {
            query: {
              name: "query",
              value: "",
              confirmationStatus: "NONE",
            },
          },
        })
        .getResponse();
    }
  },
};
