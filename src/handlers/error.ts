/**
 * Global error handler — catches any unhandled errors across all handlers.
 * Logs the error and returns a friendly spoken message.
 */

import * as Alexa from "ask-sdk-core";

export const GlobalErrorHandler: Alexa.ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error(`Unhandled error: ${error.message}`, error);

    const locale = handlerInput.requestEnvelope.request.locale ?? "en-US";
    const isPt = locale.startsWith("pt");

    return handlerInput.responseBuilder
      .speak(
        isPt
          ? "Desculpa, algo deu errado. Tenta de novo."
          : "Sorry, something went wrong. Please try again.",
      )
      .reprompt(
        isPt ? "Pode me perguntar qualquer coisa." : "You can ask me anything.",
      )
      .getResponse();
  },
};
