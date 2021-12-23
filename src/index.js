const Discord = require('discord.js');
require('dotenv').config();
const {deleteUntilId, spamMessages, deleteNum} = require('./moderation');
const {namify, denamify} = require('./meme');
const client = new Discord.Client();

const prefix = '!!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
  if (msg.content.slice(0, prefix.length) === prefix) {
    const guild = msg.guild;
    // check if they are on a server
    if (!guild) return;
    // if they have permissions
    const author = guild.member(msg.author);
    if (!author.hasPermission(Discord.Permissions.FLAGS.MANAGE_GUILD)) {
      return;
    }

    // remove prefix, trim whitespace,
    // split by spaces not in quotes, then remove quotes from all args
    const args = msg.content
        .slice(prefix.length)
        .trim()
        .match(/("|')[^"']*("|')|[^\s]+/g)
        .map((match) => match.replace(/'|"/g, ''));
    args.forEach(console.log);
    const command = args.shift().toLowerCase();
    const {channel} = msg;
    switch (command) {
      case 'clear':
        deleteNum(msg, args[0]);
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
        namify(msg, ((n) => `Colby Hager #${n}`), 'Colbificating');
        break;
      case 'decolbify':
        denamify(msg, 'Decolbificating');
        break;
      case 'namify':
        // eval expression wrapped in parenthesis to make a function
        // rather than executing said function
        // WARNING: I am well aware this is a big security risk
        const dangerousCustomCallback = eval(`(${args[0]})`);
        namify(msg, dangerousCustomCallback, args[1]);
        break;
      case 'denamify':
        denamify(msg, args[0]);
        break;
      case 'libtard':
        namify(msg, ((n) => `Liberal`), '☭Generating Commies☭');
        break;
      case 'factsandlogic':
        denamify(msg, 'Destroying the left with facts and logic 🙀');
        break;
      default:
        break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
