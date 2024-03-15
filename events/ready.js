const client = require('../index')
const { Events } = require('whatsapp-web.js')

client.on(Events.READY, () => {
    console.log(`Bot listo y en linea.`);
})