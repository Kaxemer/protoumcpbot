module.exports = {
  name: 'addgame',
  description: 'gives the user the role for a game',
  usage: 'addgame <game>( <game2> <game3>...)',
  aliases: [],
  args: false, // does this command take arguments?
  guildOnly: true, // does this command only work in a guild?
  adminOnly: false, // is this command only for admins?
  async execute(client, db, message, args) {
    var worked = [];
    var failed = [];
    for(i = 0; i < args.length; i++) {
      const game = args[i].replace(/^"(.+)"$/,'$1').replace(/^'(.+)'$/,'$1');
      const text = 'SELECT discord_id FROM aliases JOIN games ON games.id=aliases.game_id WHERE name ILIKE $1 OR alias ILIKE $1';
      var success = await db.query(text, [game])
        .then(res => {
          if(res.rowCount != 0) {
            message.member.addRole(res.rows[0].discord_id);
            return true;
          }
          return false;
        })
        .catch(e => console.error(e.stack));
      if(success) {
        worked.push(game)
      } else {
        failed.push(game);
      }
    }
    if(worked.length) {
      message.channel.send(`Added games [${worked}] to ${message.author}`);
    }
    if(failed.length) {
      message.channel.send(`Failed to find games: [${failed}]`);
    }
  },
}
