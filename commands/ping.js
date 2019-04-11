module.exports = {
  name: 'ping',
  description: 'Ping!',
  async execute(client, db, message, args) {
    message.channel.send('Pong.');
  },
};
