export const config = {
    name: "name_commands",
    aliases: ["name_cm1", "name_cm2"],
    description: "words to say",
    permission: ""
}

const data = [
    "cau 1",
    "cau 2",
    "cau 3"
]

export function onCall({ message }) {
    message.reply(data[Math.floor(Math.random() * data.length)]).catch(console.error)
}
