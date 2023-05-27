// more update
const config = {

  name: "meme",

  description: "a lot of meme (language Vietnamese)",

  aliases: ["meme", "mim", "mimi", "mêm"],

  cooldown: 5,

  credits: "Xavia Team"

}

const langData = {

  "vi_VN": {

    "invalidCategory": "Không hợp lệ! các danh mục hiện có:\n {categories}",

    "error": "Đã có lỗi xảy ra!"

  }

}

const endpoints = ["bruh", "dark", "nhanvan", "lord"]

async function onCall({ message, args, getLang }) {

    try {

        const input = args[0]?.toLowerCase();

        if (!endpoints.includes(input)) return message.reply(getLang("invalidCategory", { categories: endpoints.join(", ") }));

      const res = await global.GET(`https://data.phathuynh18.repl.co/api/meme/${input}`);

        const data = res.data;

        if (!data.url) return message.reply(getLang("error"));

        const imageStream = await global.getStream(data.url);

        await message.reply({

            attachment: [imageStream]

        });

    } catch (e) {

        console.error(e);

        message.reply(getLang("error"));

    }

}

export default {

    config,

    langData,

    onCall

}

