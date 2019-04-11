module.exports = {
  name: 'admin',
  description: 'adds or removes an admin by discord id',
  usage: 'admin <add|remove> <discord_id>',
  aliases: [],
  args: true, // does this command take arguments?
  guildOnly: false, // does this command only work in a guild?
  adminOnly: true, // is this command only for admins?
  async execute(client, db, message, args) {
    if(args.length != 2) {
      return message.channel.send('You did not provide the correct number of arguments');
    }
    const discord_id = args[1];
    if(args[0] === 'add') {
      const text = 'INSERT INTO admins (discord_id) VALUES ($1)';
      db.query(text, [discord_id])
        .then(res => {
          message.channel.send(`Added ${discord_id} to admin list`);
        })
        .catch(e => console.error(e.stack));
    } else if(args[0] === 'remove') {
      const text = 'DELETE FROM admins WHERE discord_id=$1';
      db.query(text, [discord_id])
        .then(res => {
          message.channel.send(`Removed ${discord_id} from admin list`);
        })
        .catch(e => console.error(e.stack));
    } else {
      return message.channel.send(`Invalid operation \`${args[0]}\``);
    }
  },
}
