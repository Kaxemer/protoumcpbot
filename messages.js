const Discord = require('discord.js');
const config = require('./config/config.json');

module.exports = (client, message) => {
  console.log(message.content);

  // Ingnore messages from bots
  if (message.author.bot) return;

  // Check for commands
  if(message.content.startsWith(config.prefix)) {
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // If this is a command
    if (command) {
      if (command.guildOnly && message.channel.type !== 'text') {
        return message.channel.reply('I can\'t execute that comand in the DMs.')
      }
      if (command.args && !args.length) {
        return message.channel.send(`You didn't provide the proper arguments, ${message.author}`);
      }

      if (!client.cooldowns.has(command.naFme)) {
        client.cooldowns.set(command.name, new Discord.Collection());
      }

      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;

      if (timestamps.has(message.author.id)) {
        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
          }
        }
      }

      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

      try {
        command.execute(message, args);
      }
      catch (error) {
        console.error(error);
        message.reply('Something went wrong')
      }
    }
  }
}
