const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.post('/sendEmail', (req, res) => {
    let formData = req.body;

    // Configura nodemailer con tus credenciales de SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Por ejemplo, para Gmail
        auth: {
            user: 'cypictronic@gmail.com',
            pass: 'tucontraseña'
        }
    });

    let mailOptions = {
        from: 'tuemail@gmail.com',
        to: 'destinatario@gmail.com',
        subject: `Nuevo mensaje de ${formData.name}`,
        text: formData.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send('Correo enviado con éxito');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
