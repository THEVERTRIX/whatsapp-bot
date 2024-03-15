const { Client } = require('whatsapp-web.js');

module.exports = {
    name: 'sticker',
    aliases: ['st'],
    /** 
     * @param {Client} client 
     * @param {} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!message.hasQuotedMsg) return message.reply('Responda a una imagen para convertirla en sticker.')

        const quotedMessage = await message.getQuotedMessage()

        if (!quotedMessage.hasMedia) return message.reply('El mensaje no tiene una imagen.')

        const media = await quotedMessage.downloadMedia()

        message.reply(media, null, { sendMediaAsSticker: true })

    }
}