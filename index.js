const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode');
require('dotenv').config();

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    QRCode.toString(qr, { type: 'terminal', small: true }, function (err, url) {
        console.log(url);
    });
});

require('./handler/index')(client);

module.exports = client;
// create a colletion
client.commands = new Array();

client.initialize();