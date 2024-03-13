const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode');
const { default: axios } = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    QRCode.toString(qr, { type: 'terminal', small: true }, function (err, url) {
        console.log(url);
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if (msg.body.startsWith(process.env.PREFIX)) {
        const args = msg.body
            .slice(process.env.PREFIX.length)
            .trim()
            .split(/ +/g)

        const command = args[0].toLowerCase()
        const content = args.slice(1).join(' ')

        switch (command) {
            case 'gemini':
                await model.generateContent(content).then((response) => {
                    msg.reply(response.response.text());
                }).catch(() => {
                    msg.reply('Sobrecarga de peticiones, intenta de nuevo en unos minutos.');
                });
                break;
            case 'sticker':
                if (msg.hasQuotedMsg) {
                    const quotedMsg = await msg.getQuotedMessage();
                    if (quotedMsg.hasMedia) {
                        const media = await quotedMsg.downloadMedia();
                        return msg.reply(media, null, { sendMediaAsSticker: true });
                    } else {
                        return msg.reply('No se ha encontrado una imagen!');
                    }
                } else {
                    return msg.reply('Ya enviaste una imagen?, ahora responde a esa imagen con el comando "!sticker"');
                }
            default:
                return msg.reply('Comando inválido!');
        }

    } 
});

client.initialize();