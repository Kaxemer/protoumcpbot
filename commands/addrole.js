module.exports = {
  name:'addrole',
  description: 'Adds roles to the user',
  guildOnly = true,
  execute(message, args) {
    // const pool = require('../index.js');
    const roles = message.guild.roles.toLowerCase();
    const rolesToAdd = args.toLowerCase();
    // const dbRoles =  [];
    // pool.query("SELECT game FROM games", function(err, result) {
    //   if(err) throw err;
    //   dbRoles.push(result);
    // });

    if(!args.length) {
      return message.reply('I need a role.');
    }

    rolesToAdd.forEach(function(element){
      if roles.includes(element) {
        message.author.addrole(element);
      }
    });

  }
}
