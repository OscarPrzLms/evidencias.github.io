/*
Archivo: send-message-whatsapp.js
Descripcion: Archivo de configuracion para el envio de mensajes por WhatsApp con TWILIO
Fecha: 09-02-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 09/02/2021 ::: Se crea funcion sendMessageWhatsApp() para el envio de mensajes por WhatsApp via Twilio
*/


const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('../config');

async function sendMessageWhatsApp(body) {

  try {
    
    const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
     
    client.messages
          .create({   
            to: `whatsapp:+521${body.telefono}`,
            from: 'whatsapp:+14155238886', 
            body: body.mensaje,    
            mediaUrl: body.mediaUrl
          }) 
          .then(message => console.log(message))
          .done();

  } catch (error) {

    console.log(error);
  
  }

}

module.exports = {sendMessageWhatsApp};





                    




