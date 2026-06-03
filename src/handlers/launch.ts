/**
 * LaunchRequestHandler — triggered when the user opens the skill ("Alexa, buenos dias").
 * Greets the user and keeps the mic open so they can say something.
 */

import * as Alexa from "ask-sdk-core";

export const LaunchRequestHandler: Alexa.RequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speechText = "How can I help you?";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText) // keeps the mic open
      .getResponse();
  },
};
