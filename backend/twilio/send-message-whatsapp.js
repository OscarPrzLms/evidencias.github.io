/*
Archivo: send-message-whatsapp.js
Descripcion: Archivo de configuracion para el envio de mensajes por WhatsApp con TWILIO
Fecha: 09-02-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 09/02/2021 ::: Se crea funcion sendMessageWhatsApp() para el envio de mensajes por WhatsApp via Twilio
*/

const config = require('../config');

const MessagingResponse = require('twilio').twiml.MessagingResponse;

async function sendMessageWhatsApp(body) {

  try {

    /*const accountSid = 'AC4fa52c00d1c5559bff85e2b8851d8fee'; 
    const authToken = '9a3723dc618b353c13a63edeae4f34f3';

    const client = require('twilio')(accountSid, authToken);
                          
    client.conversations.conversations('CHxxxx')
          .webhooks
          .create({
                    //'configuration.url': 'https://timberwolf-mastiff-9776.twil.io/demo-reply',
                    'configuration.url': 'https://demo.twilio.com/welcome/sms/reply/',
                    'configuration.method': 'POST',
                    'configuration.filters': ['onMessageAdded'],
                    target: 'webhook'
          })
          .then(webhook => console.log(webhook.sid));*/
    
    const accountSid = 'AC4fa52c00d1c5559bff85e2b8851d8fee'; 
    const authToken = '9a3723dc618b353c13a63edeae4f34f3'; 
          
    const client = require('twilio')(accountSid, authToken);  https://demo.twilio.com/welcome/sms/reply/
           
    client.messages
          .create({   
            to: `whatsapp:+521${body.telefono}`,
            from: 'whatsapp:+14155238886', 
            body: body.mensaje,    
            //mediaUrl: "https://demo.twilio.com/owl.png"
            mediaUrl: body.mediaUrl
          }) 
          // .then(message => console.log(message.sid))
          .then(message => console.log(message))
          .done();

  } catch (error) {

    console.log(error);
  
  }

}

module.exports = {sendMessageWhatsApp};





                    




