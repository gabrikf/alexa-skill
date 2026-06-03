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

    return handlerInput.responseBuilder
      .speak("Sorry, something went wrong. Please try again.")
      .reprompt("You can ask me anything.")
      .getResponse();
  },
};
