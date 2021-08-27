import { messageEvent, interactionEvent, commandInterface } from "../util/interfaces";
import { execFileSync } from 'child_process'
import { MessageAttachment } from "discord.js";

//Command
const ping: commandInterface = {
    names: ["say", "speak", "tts"],

    run: {
        async message({client, message, args}: messageEvent){
            const input = args.join(' ');
            if(!input) return message.reply("Hey forgot something?\nM.say <message>");
            try {
                await execFileSync('./bin/say_demo_us', ['-a', `[:PHONE ON] ${input}`, '-fo']);
                const file = new MessageAttachment('./dtmemory.wav');
                return await message.reply({content: "Here you go: " + input, files: [file]});
            } catch (error) {
                return message.reply("Something when wrong :(\n\nTry something different!")
            }
        },
        async interaction({client, interaction}: interactionEvent){
            const input = interaction.options.getString('message');
            if(!input) return interaction.reply("Hey forgot something?\nM.say <message>");
            try {
                await execFileSync('./bin/say_demo_us', ['-a', `[:PHONE ON] ${input}`, '-fo']);
                const file = new MessageAttachment('./dtmemory.wav');
                return await interaction.reply({content: "Here you go: " + input, files: [file]});
            } catch (error) {
                return interaction.reply("Something when wrong :(\n\nTry something different!")
            }
        }
    }
};

module.exports = ping