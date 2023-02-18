// Module requirements and Dotenv setup
require("dotenv").config();
const handleCommands = require("./handlers/handleCommands");
const handleEvents = require("./handlers/handleEvents");
const { token } = process.env;
const fs = require("fs");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const onReady = require("./events/client/onReady.js");

// Import sequelize and create a new instance
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "/src/utils/database.sqlite",
});

// client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

// call onReady function
client.on("ready", () => {
  onReady(client, sequelize);
});

// Sync the database and start the bot
sequelize.sync().then(() => {
  console.log("Database synced successfully");
  client.login(token);
});

// Error handling for sequelize
sequelize
  .authenticate()
  .catch((err) => console.error("Unable to connect to the database:", err));

handleCommands(client);
handleEvents(client);