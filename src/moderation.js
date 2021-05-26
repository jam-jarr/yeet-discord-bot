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
      .catch(console.error);
}

export function spamMessages(channel, content, n) {
  for (let i = 0; i <= n; i++) {
    channel.send(content + i);
  }
}
