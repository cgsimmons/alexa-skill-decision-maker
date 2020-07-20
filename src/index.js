/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

"use strict";

const Alexa = require("alexa-sdk");

const APP_ID = process.env.APP_ID;

const SKILL_NAME = "Decision Maker";
const WELCOME_MESSAGE = "Welcome to Decision Maker. ";
const HELP_MESSAGE =
    "I can help you decide between two choices. Some valid questions are; Should I have Italian or Chinese for dinner. Should we watch 'Peter Pan' or 'Rocky'. Should I go out or sleep? ";
const HELP_REPROMPT = "What can I help you decide?";
const STOP_MESSAGE = "Goodbye!";
const ERROR_MESSAGE =
    "Sorry, I did not understand. You must give me two choices and I can help you decide. Or say, help, for assistance. ";

const handlers = {
    LaunchRequest: function () {
        const message = WELCOME_MESSAGE + HELP_REPROMPT;
        this.attributes.lastSpeech = message;
        this.response.cardRenderer(SKILL_NAME, message);
        this.response.speak(message).listen(HELP_REPROMPT);
        this.emit(":responseReady");
    },
    DecisionMaker: function () {
        const verb1 = this.event.request.intent.slots.VerbOne.value || "do";
        const verb2 = this.event.request.intent.slots.VerbTwo.value || verb1;
        const verbs = [verb1, verb2];
        const option1 = this.event.request.intent.slots.OptionOne.value || "";
        const option2 = this.event.request.intent.slots.OptionTwo.value || "";
        const options = [option1, option2];
        const reason = this.event.request.intent.slots.Reason.value;

        //generate random number between 0 and 1
        const index = Math.floor(Math.random() * 2);
        let message = "You should ";
        const verb = verbs[index];
        const option = options[index];

        if (verb === "do" && !option.length) {
            const errorMessage = ERROR_MESSAGE + HELP_REPROMPT;
            this.attributes.lastSpeech = errorMessage;
            this.response.cardRenderer(SKILL_NAME, errorMessage);
            this.response.speak(errorMessage).listen(HELP_REPROMPT);
        } else {
            message += `${verb}${option.length ? " " + option : ""}`;
            if (reason != null) {
                message += " " + reason;
            }
            this.response.cardRenderer(SKILL_NAME, message);
            this.response.speak(message);
        }
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function () {
        const message = HELP_MESSAGE + HELP_REPROMPT;
        this.attributes.lastSpeech = message;
        this.response.cardRenderer(SKILL_NAME, message);
        this.response.speak(message).listen(HELP_REPROMPT);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function () {
        this.emit(":tell", STOP_MESSAGE);
    },
    "AMAZON.StopIntent": function () {
        this.emit(":tell", STOP_MESSAGE);
    },
    "AMAZON.FallbackIntent": function () {
        const message = ERROR_MESSAGE + HELP_REPROMPT;
        this.attributes.lastSpeech = message;
        this.response.cardRenderer(SKILL_NAME, message);
        this.response.speak(message).listen(HELP_REPROMPT);
        this.emit(":responseReady");
    },
    "AMAZON.RepeatIntent": function () {
        const message =
            this.attributes && this.attributes.lastSpeech
                ? this.attributes.lastSpeech
                : ERROR_MESSAGE + HELP_REPROMPT;
        this.response.cardRenderer(SKILL_NAME, message);
        this.response.speak(message).listen(HELP_REPROMPT);
        this.emit(":responseReady");
    },
    Unhandled: function () {
        return;
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
