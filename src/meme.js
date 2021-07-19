const fs = require('fs');

export function colbify(msg) {
  let n = 0;
  const {guild} = msg;
  const names = {};
  guild.members.fetch()
      .then((members) => members.each((member) => {
        names[member.id] = member.nickname;
        member.setNickname(`Colby Hager #${n}`);
        n++;
      }))
      .then(() => msg.channel.send('\`Colbification Complete\`'))
      .catch(() => {
        console.log('Error to colbify, so sad');
        n--;
      });
  fs.writeFileSync('./nicknames.json', JSON.stringify(names));
}

export function decolbify(msg) {
  const {guild} = msg;
  const nicknames = fs.readFileSync('./nicknames.json');
  guild.members.fetch()
      .then((members) => members.each((member) => {
        if (nicknames[member.id]) {
          member.setNickname(nicknames[member.id]);
        } else {
          member.setNickname(member.user.username);
        }
      }))
      .then(() => msg.channel.send('\`Decolbification Complete\`'))
      .catch(() => {
        console.log('Error to decolbify, it was meant to be');
      });
}
