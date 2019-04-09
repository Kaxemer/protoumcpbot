module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(client, db, message, args) {
    message.channel.send('Pong.');
  },
};
