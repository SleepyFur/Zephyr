const { presenceOptions } = require("../../config/pickPresence");

console.log(presenceOptions);

module.exports = (client) => {
  console.log(`Logged in as ${client.user.tag}`);

  // function to set a random presence
  const setRandomPresence = () => {
    const randomPresence =
      presenceOptions[Math.floor(Math.random() * presenceOptions.length)];
    client.user.setPresence({
      activity: {
        type: randomPresence.type,
        name: randomPresence.text,
      },
      status: randomPresence.status,
    });
  };

  // call setRandomPresence on startup
  setRandomPresence();

  // call setRandomPresence every 5 minutes
  setInterval(() => {
    setRandomPresence();
  }, 5 * 60 * 1000);
};
