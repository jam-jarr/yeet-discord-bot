export function colbify(guild) {
    let n = 0;
    guild.members.fetch()
        .then(members => members.each(member => {
            member.setNickname(`Colby Hager #${n}`)
            n++;
        }))

        .catch(console.log("Error to colbify, so sad"))
}