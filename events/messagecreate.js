const client = require('../index')
const { Events } = require('whatsapp-web.js')

client.on(Events.MESSAGE_RECEIVED, async (msg) => {

    const prefix = process.env.PREFIX
    
    if (msg.body.startsWith(prefix)) {
        const [cmd, ...args] = msg.body
        .slice(prefix.length)
        .trim()
        .split(/ +/g)

        const command = client.commands.find(c => c.name === cmd) || client.commands.find(c => c.aliases?.includes(cmd))

        if (!command) return;
        await command.run(client, msg, args)
    }
})