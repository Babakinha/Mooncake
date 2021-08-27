import { messageEvent, interactionEvent, commandInterface } from "../util/interfaces";
import { execFileSync } from 'child_process'
import { MessageAttachment } from "discord.js";

//Command
const ping: commandInterface = {
    names: ["say", "speak", "tts"],

    run: {
        async message({client, message, args}: messageEvent){
            //
            const input = args.join(' ');
            if(!input) message.reply("Hey forgot something?\nM.say <message>");
            await execFileSync('./bin/say_demo_us', ['-a', `[:PHONE ON] ${input}`, '-fo']);
            const file = new MessageAttachment('./dtmemory.wav');
            message.reply({content: "Here you go: " + input, files: [file]})
        },
        async interaction({client, interaction}: interactionEvent){

            //
        }
    }
};

module.exports = ping