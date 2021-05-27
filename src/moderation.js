import {DiscordAPIError} from 'discord.js';

export function deleteUntilId(message, n) {
  recursiveBatchDelete(message, {after: message.id});
}

export function deleteNum(msg, limit, n) {
  recursiveBatchDelete(msg, {limit});
}

function recursiveBatchDelete(message, options, n) {
  const {channel} = message;
  channel.messages
      .fetch(options)
      .then((msgs) => {
        channel.bulkDelete(msgs).then((deletedMsgs) => {
          if (n === undefined) n = 0;
          n += deletedMsgs.size;
          if (deletedMsgs.size === 50) {
            recursiveBatchDelete(message, options, n);
          } else {
            channel.send(`Cleared \`${n} messages!\``);
          }
        });
      })
      .catch((err)=> {
        if (err instanceof DiscordAPIError) {
          console.err('Some messages are too old for bulk delete!');
          console.log('Using regular delete strategy');
          recursiveDelete(message, options);
        }
      });
}

function recursiveDelete(message, options) {
  const {channel} = message;
  const n = 0;
  channel.messages
      .fetch(options)
      .then((msgs)=>{
        msgs.each((msg)=>{
          msg.delete();
          n++;
        });
      })
      .then(channel.send(`Cleared \`${n} messages!\``))
      .catch(console.err);
}

export function spamMessages(channel, content, n) {
  for (let i = 0; i <= n; i++) {
    channel.send(content + i);
  }
}
