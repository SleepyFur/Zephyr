const { ActivityType } = require("discord.js");

const presenceOptions = [
  {
    type: ActivityType.Watching,
    text: "over AlsoaDiscord!",
    status: "dnd",
  },
  {
    type: ActivityType.Listening,
    text: "commands!",
    status: "dnd",
  },
  {
    type: ActivityType.Playing,
    text: "with commands!",
    status: "dnd",
  },
];

module.exports = {
  presenceOptions,
};
