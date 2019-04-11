module.exports = {
  name: 'addgame',
  description: 'gives the user the role for a game',
  usage: 'addgame <game>( <game2> <game3>...)',
  aliases: [],
  args: false, // does this command take arguments?
  guildOnly: true, // does this command only work in a guild?
  adminOnly: false, // is this command only for admins?
  async execute(client, db, message, args) {
    args.forEach(game => {
      var success
    });
  },
}
