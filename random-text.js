export const config = {
    name: "name_commands",
    aliases: ["name_cm1", "name_cm2"],
    description: "words to say",
    permission: [0,1,2],
    cooldown: 5, //time delay
    credits: "your name"
//permissions to use the command, 
// 0 is normal user
// 1 is group admin
// 2 is bot admin  
}

const data = [
    "text 1",
    "text 2",
    "text 3"

// You can write more text like the example above
]

export function onCall({ message }) {
    message.reply(data[Math.floor(Math.random() * data.length)]).catch(console.error)

// here is the function to random "const data"
}

