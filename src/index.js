const Discord = require('discord.js');
const {deleteUntilId, spamMessages, deleteNum} = require('./moderation');
const {colbify, decolbify} = require('./meme');
const client = new Discord.Client();

const prefix = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content[0] === prefix) {
    const guild = msg.guild;
    // check if they are on a server
    if (!guild) return;
    // if they have permissions
    const author = guild.member(msg.author);
    if (!author.hasPermission(Discord.Permissions.FLAGS.MANAGE_GUILD)) {
      return;
    }

    // command
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const {channel} = msg;
    switch (command) {
      case 'clear':
        const num = args[0];
        deleteNum(msg, num + 1);
        break;
      case 'clearuntil':
        const msgID = args[0];
        channel.messages.fetch(msgID).then((message) => {
          deleteUntilId(message);
        });
        break;
      case 'spam':
        const content = args[0];
        const n = args[1];
        spamMessages(channel, content, n);
        break;
      case 'colbify':
        colbify(msg);
        break;
      case 'decolbify':
        decolbify(msg);
        break;
      default:
        break;
    }
  }
});

client.login('ODQ2OTcxMzIwODg0NjU4MTk2.YK3Rgg.slrhohTKz45ndqO6GtfQ7lfSKr0');
