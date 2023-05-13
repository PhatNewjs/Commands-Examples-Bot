const config = {

  name: "itunes",

  description: "search info music in iTunes",

  usage: "itunes [name]",

  versions: "0.0.1",

  cooldown: 5,

  credits: "Xavia Team"

}

const LangData = {

  "vi_VN": {

    "missingInput": "Vui lòng nhập tên bài hát",

    "notFound": "Không tìm thấy bài hát",

    "result": "Link: {url}\nTên bài hát: {name}\nNghệ sĩ: {artist}\nAlbum: {album}\nNgày suất bản: {release_date}\nGiá tiền: {price}\nThời lượng: {length}s\nThể loại: {genre}\n{thumbnail}",

    "error": "Đã có lỗi xảy ra!"

  }

}

async function onCall({ message, args, getLang }) {

    try {

        const input = args[0]?.toLowerCase();

        if (input?.length == 0) return message.reply(getLang("missingInput"));

        global

            .GET(`https://api.popcat.xyz/itunes?q=${input}`)

      .then(res => {

       const musicData = res.data[0];

        if (!musicData) return message.reply(getLang("notFound"));

        

        return message.reply(getLang("results", {

          url: musicData.url,

          name: musicData.name,

          artist: musicData.artist,

          album: musicData.album,

          release_date: musicData.release_date,

          price: musicData.price,

          length: musicData.length,

          genre: musicData.genre,

          thumbnail: musicData.thumbnail

              }))

            })

            .catch(e => {

                console.error(e);

                message.reply(getLang("error"));

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

