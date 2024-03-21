const { Client } = require('whatsapp-web.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

module.exports = {
    name: 'gemini',
    aliases: ['gem'],
    /** 
     * @param {Client} client 
     * @param {} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (args.length == 0) return message.reply('Debes ingresar un prompt.')

        const prompt = args.join(' ')

        await model.generateContent(prompt).then(async (result) => {
            const response = await result.response;
            const text = response.text();
            message.reply(text)
        }).catch(() => {
            message.reply('Modelo sobrecargado, intenta de nuevo mas tarde.')
        });

    }
}