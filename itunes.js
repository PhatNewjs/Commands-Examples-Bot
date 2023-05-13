const config = {

  name: "itunes",

  description: "search info music in iTunes",

  usage: "itunes [name]",

  version: "1.0.0-demo",

  cooldown: 5,

  credits: "Xavia Team"

};

const langData = {

  "vi_VN": {

    "missingInput": "Vui lòng nhập tên bài hát",

    "notFound": "Không tìm thấy bài hát",

    "results": "Tên bài hát: {name}\nNghệ sĩ: {artist}\nAlbum: {album}\nNgày xuất bản: {release_date}\nGiá tiền: {price}\nThời lượng: {length}\nThể loại: {genre}\n\nNghe tại: {url}\n\n Ảnh album: {thumbnail}",

    "error": "Đã có lỗi xảy ra!"

  },

  "en_US": {

    "missingInput": "Please enter the name of a song",

    "notFound": "Song not found",

    "results": "Song title: {name}\nArtist: {artist}\nAlbum: {album}\nRelease date: {release_date}\nPrice: {price}\nLength: {length}\nGenre: {genre}\n\nListen at: {url}\n\nAlbum thumbnail: {thumbnail}",

    "error": "An error occurred!"

  },

  "ar_SY": {

    "missingInput": "يرجى إدخال اسم الأغنية",

    "notFound": "لم يتم العثور على الأغنية",

    "results": "عنوان الأغنية: {name}\nالفنان: {artist}\nالألبوم: {album}\nتاريخ الإصدار: {release_date}\nالسعر: {price}\nالمدة: {length}\nالنوع: {genre}\n\nالاستماع في: {url}\n\nصورة الألبوم: {thumbnail}",

    "error": "حدث خطأ!"

  }

};

async function onCall({ message, args, getLang }) {

  try {

    const input = args.join("+").toLowerCase();

    if (!input) return message.reply(getLang("missingInput"));

    const encodedInput = encodeURIComponent(input);

    const res = await global.GET(`https://api.popcat.xyz/itunes?q=${encodedInput}`);

    const musicData = res.data;

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

    }));

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

// Thuhang bruh:)
