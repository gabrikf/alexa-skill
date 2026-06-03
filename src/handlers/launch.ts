/**
 * LaunchRequestHandler — triggered when the user opens the skill ("Alexa, buenos dias").
 * Instead of just greeting and waiting, we use addElicitSlotDirective to
 * immediately ask Alexa to fill the CatchAllIntent's "query" slot.
 * This means whatever the user says next goes directly into the slot — no carrier phrase needed.
 */

import * as Alexa from "ask-sdk-core";

export const LaunchRequestHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const locale = handlerInput.requestEnvelope.request.locale ?? "en-US";
    const speechText = locale.startsWith("pt")
      ? "Como posso te ajudar?"
      : "How can I help you?";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
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
  },
};
