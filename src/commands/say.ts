import { messageEvent, interactionEvent, commandInterface } from "../util/interfaces";
import { MessageAttachment } from "discord.js";
import { say } from "dectalk";

//Command
const ping: commandInterface = {
    names: ["say", "speak", "tts"],

    run: {
        async message({client, message, args}: messageEvent){
            const input = args.join(' ');
            if(!input) return message.reply("Hey forgot something?\nM.say <message>");
            try {
                let wavdata = await say(input, {EnableCommands: true});
                const file = new MessageAttachment(wavdata, 'aieou.wav');
                return await message.reply({content: "Here you go!", files: [file]});
            } catch (error) {
                return message.reply("Something when wrong :(\n\nTry something different!")
            }
        },
        async interaction({client, interaction}: interactionEvent){
            const input = interaction.options.getString('message');
            if(!input) return interaction.reply("Hey forgot something?\nM.say <message>");
            try {
                let wavdata = await say(input, {EnableCommands: true});
                const file = new MessageAttachment(wavdata, 'aieou.wav');
                return await interaction.reply({content: "Here you go!", files: [file]});
            } catch (error) {
                return;
            }
        }
    }
};

module.exports = ping
