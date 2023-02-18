const { Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = (client) => {
  client.commands = new Collection();

  const commandFiles = readdirSync(join(__dirname, "..", "commands"), {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const dir of commandFiles) {
    const commandFiles = readdirSync(
      join(__dirname, "..", "commands", dir)
    ).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(join(__dirname, "..", "commands", dir, file));
      client.commands.set(command.data.name, command);
    }
  }

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      // dwfer the reply to indicate processing 
      await interaction.deferReply();

      // call the execute method
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);

      // reply with err if failed
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });
};
