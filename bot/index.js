var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const APP_TOKEN = 'EAADQtk3IS3sBAEgiiFCuVvgLHDgVNUeGGPIAl1PWSqkQqHhRZCvdpEIISzLeXtr5QpGOxZCgHaGZBGf2ZAHH7Gh5ZBmWtQ05315ZCknG2FSHFKWbsfpaPVu9cfuJu0MCxPE9alx81rOWaKlPUjkwavklyCUxmsfXHzZBVZA16ANlIQZDZD';

var app = express();
app.use(bodyParser.json());

app.listen(3000, function () {
    console.log('El servidor se encuentra en el puerto 3000');
});

app.get('/', function (req, res) {
    res.send('Bienvenido');
});

app.get('/webhook', function (req, res) {

    if (req.query['hub.verify_token'] === 'nadia_visaka_kesly_x3places') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Tu no tienes que entrar aqui');
    }
});

app.post('/webhook', function (req, res) {

    var data = req.body;
    if (data.object == 'page') {
        data.entry.forEach(function (pageEntry) {
            pageEntry.messaging.forEach(function (messagingEvent) {

                if (messagingEvent.message) {
                    receiveMessage(messagingEvent);
                }
            });
        });
        res.sendStatus(200);
    }
});

function receiveMessage(event) {
    var senderID = event.sender.id;
    var messageText = event.message.text;

    console.log(senderID);
    console.log(messageText);

    evaluateMessage(senderID, messageText);
}

function evaluateMessage(recipientId, message) {
    var finalMessage = '';

    if (isContain(message, 'hola')) {
        finalMessage = 'Hola, Bienvenido a NEAR ME';
    } else if(isContain(message, 'como estas?')){

        finalMessage = 'Bien gracias ¿y tú?';

    } else if(isContain(message, 'parque')) {

        finalMessage = 'si miras el mapa podrás encontrar algunos parques';

    } else if (isContain(message, 'parques')) {

        finalMessage = 'si miras el mapa podrás encontrar algunos parques';

    } else if (isContain(message, 'mapa')){
        
        finalMessage = 'en el mapa puedes trazar tu ruta';

    } else {

        finalMessage = 'Near me te ayuda a encontrar los parques cercanos a tu ubicación y te dice como llegar';
    } 

    sendMessageText(recipientId, finalMessage);
}

function sendMessageText(recipientId, message) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: message
        }
    };
    callSendAPI(messageData);
}

function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: APP_TOKEN
        },
        method: 'POST',
        json: messageData
    }, function (error, response, data) {

        if (error) {
            console.log('No es posible enviar el mensaje');
        } else {
            console.log('El mensaje fue enviado');

        }

    });
}

function isContain(sentence, word) {
    return sentence.indexOf(word) > -1;
}