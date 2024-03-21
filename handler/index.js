const { glob } = require("glob");
const { Client } = require('whatsapp-web.js')

/**
 * @param {Client} client
**/

module.exports = async (client) => {
    // Commands
    const commandFiles = await glob(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.push(file.name, properties);
        }
    });

    // Events
    const eventFiles = await glob(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));
}