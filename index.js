const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to Rock Paper Scissors. What do you choose?';
        const repromptText = 'What do you choose?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(repromptText)
            .getResponse();
    }
};

const GameIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GameIntent';
    },
    handle(handlerInput) {
        let speechText = '';
        let repromptText ='What is your next move?';

        const userAction = handlerInput.requestEnvelope.request.intent.slots.action.value;

        const ACTIONS=[
            'paper',
            'rock',
            'scissors'
        ];

        const alexaAction=ACTIONS[Math.floor(Math.random()*ACTIONS.length)];

        const result = userAction+alexaAction;

        switch(result)
        {
            case 'rockrock':
                speechText+="you played rock and i played rock, it is a tie! ";
                break;
            case 'rockpaper':
                speechText+="you played rock and i played paper, I win! ";
                break;
            case 'rockscissors':
                speechText+="you played rock and i played scissors, you win! congratulations ";
                break;
            case 'paperrock':
                speechText+="you played paper and i played rock, you win! congratulations ";
                break;
            case 'paperpaper':
                speechText+="you played paper and i played paper, it is a tie! ";
                break;
            case 'paperscissors':
                speechText+="you played paper and i played scissors, I win! ";
                break;
            case 'scissorsrock':
                speechText+="you played scissors and i played rock, I win! ";
                break;
            case 'sissorspaper':
                speechText+="you played scissors and i played paper, you win! congratulations ";
                break;
            case 'scissorsscissors':
                speechText+="you played scissors and i played scissors, it is a tie! ";
                break;
            default:
                 break;
        }
        return handlerInput.responseBuilder
            .speak(speechText + repromptText)
            .reprompt(repromptText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You need to choose any of the one from rock, paper or scissors.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GameIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler) 
    .addErrorHandlers(ErrorHandler)
    .lambda();
