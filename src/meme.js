export function colbify(msg) {
  let n = 0;
  const {guild} = msg;
  guild.members.fetch()
      .then((members) => members.each((member) => {
        member.setNickname(`Colby Hager #${n}`);
        n++;
      }))
      .then(() => msg.channel.send('\`Colbification Complete\`'))
      .catch(() => {
        console.log('Error to colbify, so sad');
        n--;
      });
}

export function decolbify(msg) {
  const {guild} = msg;
  guild.members.fetch()
      .then((members) => members.each((member) => {
        const username = member.user.username;
        member.setNickname(username);
      }))
      .then(() => msg.channel.send('\`Decolbification Complete\`'))
      .catch(() => {
        console.log('Error to decolbify, it was meant to be');
      });
}
