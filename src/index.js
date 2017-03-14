/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'MakeDecision': function () {

        const verb1 = this.event.request.intent.slots.VerbOne.value;
        const verb2 = this.event.request.intent.slots.VerbTwo.value;
        const verbs = [verb1, verb2];
        const option1 = this.event.request.intent.slots.OptionOne.value;
        const option2 = this.event.request.intent.slots.OptionTwo.value;
        const options = [option1, option2];

        //generate random number between 0 and 1
        const index = Math.floor(Math.random() * 2);

        this.emit(':tell', 'You should ' + verbs[index] + ' ' + options[index]);
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
