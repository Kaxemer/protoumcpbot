require('dotenv').config()

const fs = require('fs');
const Discord = require('discord.js');
// const { Pool } = require('pg');

const messages = require('./messages.js')
const config = require('./config/config.json')

// Initialize client
const client = new Discord.Client();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: true
// });


// Read commands from command directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.cooldowns = new Discord.Collection();


client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => messages(client, message));

client.login(process.env.DISCORD_TOKEN);
