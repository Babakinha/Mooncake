import { messageEvent, interactionEvent, commandInterface } from "../util/interfaces";

//Command
const ping: commandInterface = {
    names: ["ping", "latency", "pong"],

    run: {
        async message({client, message}: messageEvent){
            message.reply('Cauculating real quick...')
                .then(result => {
                    const ping = result.createdTimestamp - message.createdTimestamp;

                    return result.edit(`Pong!\nBot's ping: ${ping},\nAPI's ping: ${client.ws.ping}`);
                });
        },
        async interaction({client, interaction}: interactionEvent){

            return interaction.reply(`Pong!,\nAPI's ping: ${client.ws.ping}`)
        }
    }
};

module.exports = ping