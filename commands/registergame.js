module.exports = {
  name: 'registergame',
  description: 'Registers a new game in the db',
  usage: 'registergame <game_name> <role_id>',
  guildOnly: true,
  adminOnly: true,
  execute(client, db, message, args) {
    if(args.length != 2) {
      message.channel.send('Incorrect number of arguments')
      return;
    }
    game_name = args[0].replace(/^"(.+)"$/,'$1').replace(/^'(.+)'$/,'$1');
    role_id = args[1].replace(/^"(.+)"$/,'$1').replace(/^'(.+)'$/,'$1');

    if(message.guild.roles.has(role_id)) {
      const text = "INSERT INTO games(discord_id, name) VALUES ($1, $2) RETURNING *";
      db.query(text, [role_id, game_name])
        .then(res => {
          console.log(res.rows[0]);
          message.channel.send('Added game to `!addgame`');
        })
        .catch(e => console.error(e.stack));
    } else {
      message.channel.send('That role does not exist.');
    }
  },
};
