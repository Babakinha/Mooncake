import { MessageEmbed } from "discord.js";
import { messageEvent, interactionEvent, commandInterface } from "../util/interfaces";

const helpMessage = new MessageEmbed()
    .setColor("AQUA")
    .setTitle("Help Message")
        .setDescription("We don't have a Help message yet :(\nTry again another day\nThe only thing we can hint you is m.say and m.ping");

//Command
const help: commandInterface = {
    names: ["", "help"],

    run: {
        async message({client, message}: messageEvent){
            return message.reply({embeds: [helpMessage]});
        },
        async interaction({client, interaction}: interactionEvent){

            return interaction.reply({ embeds: [helpMessage] });
        }
    }
};

module.exports = help