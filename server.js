const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 2000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configura tu transportador de Nodemailer con tus datos
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ejemplo con Gmail
    auth: {
        user: 'pagoseguro81@gmail.com', // Tu correo
        pass: 'efigueroa2024' // Tu contraseña
    }
});

app.post('/enviar-consulta', (req, res) => {
    let mailOptions = {
        from: 'pagoseguro81@gmail.com',
        to: 'cypictronic@gmail.com', // Tu correo donde quieres recibir las consultas
        subject: `Nueva consulta de ${req.body.nombre}`,
        text: `Nombre: ${req.body.nombre}\nEmail: ${req.body.email}\nMensaje: ${req.body.mensaje}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send('Error al enviar el mensaje.');
        } else {
            console.log('Mensaje enviado: ' + info.response);
            res.send('Consulta enviada con éxito.');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});






// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Middleware para parsear el cuerpo de las peticiones POST
// app.use(bodyParser.urlencoded({ extended: true }));

// // Ruta que maneja la petición POST del formulario
// app.post('/enviar-consulta', (req, res) => {
//     const nombre = req.body.nombre;
//     const email = req.body.email;
//     const mensaje = req.body.mensaje;

//     // Aquí puedes procesar los datos, como guardarlos en una base de datos o enviar un correo electrónico
//     console.log(`Nombre: ${nombre}, Email: ${email}, Mensaje: ${mensaje}`);

//     // Enviar una respuesta al cliente
//     res.send('Consulta recibida. Gracias!');
// });

// // Iniciar el servidor
// app.listen(port, () => {
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// });
