const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = (client) => {
  const eventFiles = readdirSync(
    join(__dirname, "..", "events", "client")
  ).filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(join(__dirname, "..", "events", "client", file));
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
};
