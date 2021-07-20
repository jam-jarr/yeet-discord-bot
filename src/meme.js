const fs = require('fs');

export function colbify(msg) {
  let n = 0;
  const {guild} = msg;
  const names = {};
  guild.members.fetch()
      .then((members) => {
        members.filter((member) => member.manageable)
            .each((member) => {
              names[member.id] = member.nickname;
              member.setNickname(`Colby Hager #${n}`);
              n++;
            });
        fs.writeFileSync('./nicknames.json', JSON.stringify(names));
      })
      .then(() => msg.channel.send('\`Colbificating\`'))
      .catch((err) => {
        console.error(err);
        n--;
      });
}

export function decolbify(msg) {
  const {guild} = msg;
  const nicknames = JSON.parse(fs.readFileSync('./nicknames.json'));
  guild.members.fetch()
      .then((members) => members.filter((member) => member.manageable)
          .each((member) => {
            if (nicknames[member.id]) {
              member.setNickname(nicknames[member.id])
                  .catch(console.error);
            } else {
              member.setNickname(member.user.username)
                  .catch(console.error);
            }
          }))
      .then(() => msg.channel.send('\`Decolbificating\`'))
      .catch(console.error);
}
