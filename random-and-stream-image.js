const config = {
  name: "name_cmd",
  aliases: ["name1", "name2"], 
  description: "Words your say",
  version: "1.0.0",
  permissions: [0, 1, 2],
  credits: "your name"
};

const images = [
  "https://i.imgur.com/19sEFXH.jpeg", 
  "https://i.imgur.com/hpWn7My.jpeg",
  "https://i.imgur.com/hpWn7My.jpeg"
// example
];

function getRandomIndex(arr) {
  const max = arr.length - 1;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function onCall({ message }) {
  try {
    if (images.length === 0) return message.reply(getLang("error"));

    const index = getRandomIndex(images);
    const image = images[index];

    const imageStream = await global.getStream(image);
    await message.reply({
      attachment: [imageStream]
    });
  } catch (e) {
    message.reply(getLang("error"));
  }

  return;
}

export default {
  config,
  onCall
};
