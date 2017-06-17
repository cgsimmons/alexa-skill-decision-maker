/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.f1586d68-6c7e-4dc8-9d48-ada9897e8ee3';

const SKILL_NAME = "Decision Maker";
const WELCOME_MESSAGE = "Welcome to Decision Maker. "
const HELP_MESSAGE = "I can help you decide between two choices. Some valid questions are; Should I have Italian or Chinese for dinner. Should we watch 'Peter Pan' or 'Rocky'. Should I go out or sleep? ";
const HELP_REPROMPT = "What can I help you decide?";
const STOP_MESSAGE = "Goodbye!";
const ERROR_MESSAGE = "Sorry, I did not understand. You must give me two choices and I can help you decide. Or say, help, for assistance. ";

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', WELCOME_MESSAGE + HELP_REPROMPT, HELP_REPROMPT);
    },
    'DecisionMaker': function () {
        let verb1 = this.event.request.intent.slots.VerbOne.value;
        if (verb1 == null) {
            verb1 = 'do';
        }
        const verb2 = this.event.request.intent.slots.VerbTwo.value;
        const verbs = [verb1, verb2];
        const option1 = this.event.request.intent.slots.OptionOne.value;
        const option2 = this.event.request.intent.slots.OptionTwo.value;
        const options = [option1, option2];
        const reason = this.event.request.intent.slots.Reason.value;

        //generate random number between 0 and 1
        const index = Math.floor(Math.random() * 2);
        let message = "You should ";
        const verb = verbs[index] == null ? verbs[0] : verbs[index];
        const option = options[index];

        if (option == null || options.length != 2) {
            this.emit(':ask', ERROR_MESSAGE + HELP_REPROMPT, HELP_REPROMPT);
        }
        else {
            message += verb + ' ' + option;
            if (reason != null) {
                message += ' ' + reason;
            }
            this.emit(':tell', message);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', HELP_MESSAGE + HELP_REPROMPT, HELP_REPROMPT);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
