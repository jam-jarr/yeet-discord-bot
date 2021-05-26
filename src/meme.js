export function colbify(guild) {
  let n = 0;
  guild.members.fetch()
      .then((members) => members.each((member) => {
        member.setNickname(`Colby Hager #${n}`);
        n++;
      }))

      .catch(() => {
        console.log('Error to colbify, so sad');
        n--;
      });
}

export function decolbify(guild) {
  guild.members.fetch()
      .then((members) => members.each((member) => {
        const username = member.user.username;
        member.setNickname(username);
      }))

      .catch(() => {
        console.log('Error to decolbify, it was meant to be');
      });
}
