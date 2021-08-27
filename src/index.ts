import { Prefix } from './config.json';
import { Client, Intents } from 'discord.js'
import CommandHandler from './util/CommandHandler';
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES]});

// Load .env if it can
try {
    require('dotenv').config();
} catch (e) {}

// Load Commands
const Commands = new CommandHandler()
Commands.loadCommands(__dirname + '/commands/');

// Events
client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
    client.user?.setActivity({"type": 'PLAYING', "name": 'S.help'})
})

client.on('messageCreate', async (message) => {
    if (!message.content.toLowerCase().startsWith(Prefix) || message.author.bot) return;

    const args: string[] = message.content.slice(Prefix.length).trim().split(/ +/);
    const command = args.shift()!.toLowerCase(); // Only lowercase commands

    /*
    // Dev way to create slash commands
    if (command === 'devdeploy' && message.author.id === "487644363124637718") {
        const { SlashCommandBuilder } = require('@discordjs/builders');

        const data = new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Just a simple ping command!');

        const command = await client.application?.commands.create(data);
        console.log(command);

    }
    */

    try {
        Commands.getCommand(command).message({
            message: message,
            args: args,
            client: client           
        });
    } catch (e) {
        let errorMessage = (e as Error).message
        if(errorMessage === "CommandNotFound")
            message.reply('Sorry didn\'t find that command :( \nDid you type it right?');
        else 
            console.log(e);
    }
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) return;

    try {
        Commands.getCommand(interaction.commandName).interaction({
            interaction: interaction,
            client: client           
        });
    } catch (e) {
        let errorMessage = (e as Error).message
        if(errorMessage === "CommandNotFound")
            interaction.reply('Sorry didn\'t find that command :( \nDid you type it right?\nIdk probably just a bug in the sushi i ate earlier...\nKinda gross');
        else 
            console.log(e);
    }
})

client.login(process.env.DISCORD_TOKEN as string)