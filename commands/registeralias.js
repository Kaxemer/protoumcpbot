module.exports = {
  name: 'registeralias',
  description: 'adds an alias for addgame',
  usage: 'registeralias <alias> <game>',
  aliases: ['alias'],
  args: true, // does this command take arguments?
  guildOnly: true, // does this command only work in a guild?
  adminOnly: true, // is this command only for admins?
  async execute(client, db, message, args) {
    if(args.length != 2) {
      message.channel.send('Incorrect number of arguments')
      return;
    }
    alias = args[0].replace(/^"(.+)"$/,'$1').replace(/^'(.+)'$/,'$1');
    game_name = args[1].replace(/^"(.+)"$/,'$1').replace(/^'(.+)'$/,'$1');

    const text1 = 'SELECT * FROM games WHERE name=$1';
    db.query(text1, [game_name])
      .then(res => {
        if(res.rows.length < 1) {
          message.channel.send(`Game \`${game_name}\` not found.`);
          return;
        }
        // Check if this alias is used for a different game
        db.query('SELECT * FROM aliases WHERE alias=$1', [alias])
          .then(res1 => {
            if(res1.rows.length > 0) {
              message.channel.send(`Alias \'${alias}\' already exists`);
              return;
            }
            const text2 = 'INSERT INTO aliases (game_id, alias) VALUES ($1, $2)';
            db.query(text2, [res.rows[0].id, alias])
              .then(res2 => {
                message.channel.send(`Added alias \`${alias}\` for game \`${game_name}\``);
              })
              .catch(e => console.error(e.stack));
          })
          .catch(e => console.error(e.stack));
      })
      .catch(e => console.error(e.stack));
  },
}
