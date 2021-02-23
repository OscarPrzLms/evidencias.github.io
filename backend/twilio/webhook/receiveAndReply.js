/*
WebHook: receiveAndReply.js
Descripcion: WebHook que recibe y responde mensajes desde WhatsApp
Fecha: 17-02-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 17/02/2021 ::: Se implementa WebHook para recibir y responder mensajes desde WhatsApp
*/

const http = require('http');
// const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// const app = express();

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});