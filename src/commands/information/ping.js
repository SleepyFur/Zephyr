const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns bot ping!"),
  async execute(interaction, client) {
    const message = await interaction.editReply({
      content: "Pinging...",
    });

    const newMessage = `API Latency: ${client.ws.ping}\nClient Ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
