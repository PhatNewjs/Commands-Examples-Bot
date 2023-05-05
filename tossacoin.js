const config = {
  name: "flipcoin",
  _name: {
    "vi_VN": "latxu"
  },
  aliases: [""],
  description: "flip coin with bot",
  usage: "[upside/u] [bet] or [downside/d] [bet]",
  credits: "Xavia Team",
  versions: "1.0.0",
  extra: {
    minbet: 50, // The minimum bet amount
  },
};

const langData = {
    "vi_VN": {
    "tosscoin.userNoData": "Dữ liệu của bạn chưa sẵn sàng...",
    "tosscoin.invalidChoice": "Lựa chọn không hợp lê, các lựa chọn có sẵn:\n{validChoices}",
    "tosscoin.notEnoughMoney": "Bạn không đủ tiền để cược..",
    "tosscoin.minmoney": "Số tiền cược tối thiểu là {min} XC",
    "tosscoin.win": "Bạn đã thắng: {bet} XC",
    "tosscoin.lose": "Bạn đã thua: {bet} XC",
    "tosscoin.error": "đã có lỗi xảy ra!"
  },
  "en_US": {
    "tosscoin.userNoData": "Data User is not ready...",
    "tosscoin.invalidChoice": "Invalid choice, available choices:\n{validChoices}",
    "tosscoin.notEnoughMoney": "you don't have enough money to bet.",
    "tosscoin.minmoney": "Minimum bet is {min} XC.",
    "tosscoin.win": "You won {bet} XC",
    "tosscoin.lose": "You lost {bet} XC",
    "tosscoin.error": "An error has occurred, try again later."
      },
  "ar_SY": {
    "tosscoin.userNoData": "مستخدم البيانات ليس جاهزًا",
    "tosscoin.invalidChoice": "خيار غير صالح ، الخيارات المتاحة:\n{validChoices}",
    "tosscoin.notEnoughMoney": "مال غير كاف.",
    "tosscoin.minmoney": "الحد الأدنى للرهان هو {min} XC.",
    "tosscoin.win": "بن ثونغ: {bet} XC.",
    "tosscoin.lose": "لقد خسرت {bet} XC.",
    "tosscoin.error": "حدث خطأ ، حاول مرة أخرى في وقت لاحق."
  }
  };

async function onCall({ message, args, extra, getLang }) {
  const { Users } = global.controllers;
  const validChoices = ["u", "upside", "d", "downside"];

  const choice = args[0]?.toLowerCase();
  const bet = BigInt(args[1] || extra.minbet);

  if (!choice || !validChoices.includes(choice)) {
    const validStr = validChoices.join(", ");
    return message.reply(getLang("tosscoin.invalidChoice", { validChoices: validStr }));
  }

  try {
    const userMoney = await Users.getMoney(message.senderID) || null;
    if (userMoney === null) {
      return message.reply(getLang("tosscoin.userNoData"));
    }
    if (BigInt(userMoney) < bet) {
      return message.reply(getLang("tosscoin.notEnoughMoney"));
    }
    if (bet < BigInt(extra.minbet)) {
      return message.reply(getLang("tosscoin.minmoney", { minBet: extra.minbet }));
    }

    await Users.decreaseMoney(message.senderID, bet);

    const isUpside = Math.random() < 0.5;
    const result = isUpside ? "upside" : "downside";
    const didWin = (choice === "u" || choice === "upside") ? isUpside : !isUpside;

    const winnings = didWin ? bet * BigInt(2) : BigInt(0);
    if (didWin) {
      await Users.increaseMoney(message.senderID, winnings);
      return message.reply(getLang("tosscoin.win", { bet: winnings, result }));
    } else {
      return message.reply(getLang("tosscoin.lose", { bet, result }));
    }
  } catch (error) {
    console.error(error);
    return message.reply(getLang("tosscoin.error"));
  }
}

export default {
  config,
  langData,
  onCall,
};
