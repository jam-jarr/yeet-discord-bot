import {DiscordAPIError} from 'discord.js';

export function deleteUntilId(message) {
  const n = 0;
  recursiveSmartDelete(message, {after: message.id}, n);
}

export function deleteNum(msg, limit) {
  const n = 0;
  recursiveSmartDelete(msg, {limit: Number(limit) + 1}, n);
}

function recursiveSmartDelete(message, options, n) {
  const {channel} = message;
  channel.messages
      .fetch(options)
      .then((msgs) => {
        channel.bulkDelete(msgs)
            .then((deletedMsgs) => {
              if (n === undefined) n = 0;
              n += deletedMsgs.size;
              if (deletedMsgs.size === 50) {
                // 50 is the max ammount of that can be bulk deleted
                recursiveSmartDelete(message, options, n);
              } else {
                channel.send(`Cleared \`${n-1} messages!\``)
                    .then((response) => {
                      setTimeout(() => response.delete(), 3000);
                    });
              }
            })
            .catch((err) => {
              if (err instanceof DiscordAPIError) {
                console.error('Some messages are too old for bulk delete!');
                console.log('Using regular delete strategy');
                deleteNumBatchless(message, options);
              } else {
                console.error(err);
              }
            });
      });
}

function deleteNumBatchless(message, options) {
  const {channel} = message;
  const {limit} = options;
  console.log(limit);
  let n = 0;
  channel.messages
      .fetch(options)
      .then((msgs) => {
        msgs.each((msg) => {
          msg.delete();
          n++;
        });
        channel.send(`Cleared \`${n-1} messages!\``)
            .then((response) => {
              setTimeout(() => response.delete(), 3000);
            });
      })
      .catch(console.err);
}

export function spamMessages(channel, content, n) {
  for (let i = 0; i <= n; i++) {
    channel.send(content + i);
  }
}
