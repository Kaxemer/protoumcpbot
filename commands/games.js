module.exports = {
  name: 'games',
  description: 'Lists all games',
  usage: 'games',
  args: false, // does this command take arguments?
  guildOnly: true, // does this command only work in a guild?
  adminOnly: false, // is this command only for admins?
  async execute(client, db, message, args) {
    db.query('SELECT (name) FROM games')
      .then(res => {
        games = "Games: \n"
        res.rows.forEach(s => {
          games = games + s.name + '\n';
        })
        message.channel.send(games);
      })
      .catch(e => console.error(e.stack));
  },
}
