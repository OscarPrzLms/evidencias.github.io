/*
Archivo: Index.js(Server)
Descripcion: Peticiones al Servidor
Fecha: 02-01-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 05/02/2021 ::: Se integra peticion POST para validacion de Login de Usuario
* 16/02/2021 ::: Se integra peticion POST para Evidencias por WhatsApp via Twilio
*/


//=================== Settings =======================
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const express = require('express');
const server = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const cors = require('cors');
const { Evidencias } = require('../models');
const { Usuarios } = require('../models');
const { SesionWhastApp } = require('../models');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {sendMessageWhatsApp} = require('../twilio/send-message-whatsapp');
server.use(bodyParser.urlencoded({ extended: false })) 
server.use(bodyParser.json())

//=================== Middlewares =======================

server.use(express.json());
server.use(express.static(__dirname + "/../public"));
server.use(cors());
server.use(morgan('dev'));

//=================== Routes  ============================

//------------------ Registro Usuario --------------------

server.post("/nuevousuario", async (req, res) => {

  let body = req.body;
  
    let nuevoUsuario = new Usuarios({
      nombre: body.nombre,
      aPaterno: body.aPaterno,
      aMaterno: body.aMaterno,
      email: body.email,
      contrasena: bcrypt.hashSync( body.contrasena, 10),
      repContrasena: bcrypt.hashSync( body.repContrasena, 10),
      fechaNacimiento: body.fechaNacimiento
  });

  nuevoUsuario.save( (err, nuevoUsuarioBD) => {
    if( err ) {
      return res.status(400).json({
        ok:false,
        err
      })
    }

    res.json({
      ok:true,
      nuevoUsuario: nuevoUsuarioBD 
    })

  });

});

//------------------ Login Usuario --------------------

server.post('/login', (req, res) => {

  let body = req.body;

  Usuarios.findOne({ email: body.email }, (err, usuarioDB) => {

    if(err){
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if( !usuarioDB ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: '(usuario) o contraseña incorrectos'
        }
      })
    }

    if ( !bcrypt.compareSync( body.contrasena, usuarioDB.contrasena ) ) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'usuario o (contraseña) incorrectos'
        }
      })
    }

    res.json({
      ok:true,
      usuario: usuarioDB,
      token: '123',
    });

  });

});

//------------------ Evidencias --------------------

server.post('/sesionWhatsApp', async (req, res) => {

  let body = req.body;
  
  let sesionWhastApp = new SesionWhastApp ({
    telefono: body.telefono,
    mensaje: body.mensaje,
    mediaUrl: body.evidencia

  })

  await sendMessageWhatsApp(sesionWhastApp)

   sesionWhastApp.save( (err, evidencia) => {

     if( err ) {
       return res.status(400).json({
         ok:false,
         err
       })
     }

     res.json({
       ok:true,
       sesionWhastApp: evidencia
     })

   });

});

//------------------ WebHook WhatsApp --------------------

// server.post('/conversationWhatsApp', (req, res) => {
//   const twiml = new MessagingResponse();

//   twiml.message('The Robots are coming! Head for the hills!');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

// http.createServer(server).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });
  
  server.post('/conversationWhatsApp', async (req, res) => {

    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    //Agregado
    let body = req.body;
  
    let sesionWhastApp = new SesionWhastApp ({
      telefono: body.telefono,
      mensaje: body.mensaje,
      mediaUrl: body.evidencia
  
    })

    await sendMessageWhatsApp(sesionWhastApp)

    sesionWhastApp.save( (err, evidencia) => {

     if( err ) {
       return res.status(400).json({
         ok:false,
         err
       })
     }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    
    res.json({
      ok:true,
      sesionWhastApp: evidencia
     })



   });
    //Agregado

    

});

//=================== Static Files ============================










//Actualiza Usuario
/*server.put('/usuario/:id', function(req, res){
  
  let id = req.params.id;
  let body = _.pick(req.body,['nombre', 'aPaterno', 'aMaterno', 'fechaNacimiento']  
  );

  Usuarios.findByIdAndUpdate( id, body, { new: true}, (err, usuarioBD) => {

    if( err ) {
      return res.status(400).json({
        ok:false,
        err
      })
    }

    res.json({
      ok: true,
      usuario: usuarioBD
    });
  }) 

})*/

//Obtener Usuarios
/*server.get('/usuario', function(req, res) {
  Usuarios.find({})
          .exec(( err, usuarios ) => {
            if( err ) {
              return res.status(400).json({
                ok:false,
                err
              })
            }
            res.json({
              ok: true,
              usuarios
            })
          });
});*/


//Eliminar usuario
/*server.delete('/usuario/:id', function (req, res) {
  let id = req.params.id;
  Usuarios.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if( err ) {
      return res.status(400).json({
        ok:false,
        err
      })
    }

    if(!usuarioBorrado){
      return res.status(400).json({
        ok:true,
        err: {
          message: 'Usuario no encontrado'
        }
      })
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado
    });

  });
});*/

//Routes
/*server.get("/api/evidencias", async (req, res) => {
  let evidencias = await Evidencias.find();
  evidencias = evidencias.map((evidencia) => {
  evidencia.evidencias = `${req.protocol}://${req.headers.host}/img/${evidencia.nombreEvidencia}`;
  return evidencia;
  });

  return res.send({ error: false, data: evidencias });
});

server.get("/api/evidencia/:id", async (req, res) => {
  const { id } = req.params;
  let evidencia = await Evidencias.findById(id);
  evidencia.evidencias = `${req.protocol}://${req.headers.host}/img/${evidencia.nombreEvidencia}`;
  return res.send({ error: false, data: evidencia });
  });*/


//Busqueda por Nombre
/*server.get("/api/evidencia/busqueda/:nombre", async (req, res) => {
  const { nombre } = req.params;
  let evidencias = await Evidencias.find({
    nombre:{ $regex: new RegExp(nombre, "i") }
  });
  evidencias = evidencias.map((evidencia) => {
  evidencia.evidencias = `${req.protocol}://${req.headers.host}/img/${evidencia.nombreEvidencia}`;
  return evidencia;
  });
  return res.send({ error: false, data: evidencias });
});*/
  
module.exports = server;


