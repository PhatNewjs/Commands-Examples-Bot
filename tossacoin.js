const config = {
  name: "tungdongxu",
  _name: {
  "en_US": "tosscoin"
  },
  usage: "[upside/down] [number bet]",
  cooldown: 5, 
  credits: "Xavia Team",
  extra: {
    minbet: 50
  }
}
// bruh
const LangData = {
  "vi_VN": {
    "tosscoin.userNoData": "Dữ liệu của bro chưa sẵn sàng...",
    "tosscoin.invalidChoice": "Lựa chọn không hợp lê, các lựa chọn có sẵn:\n{validChoces}",
    "tosscoin.notEnoughMoney": "Bạn không đủ tiền để cược..",
    "tosscoin.minmoney": "Số tiền cược tối thiểu là {min} XC",
    "tosscoin.win": "Bạn đã thắng: {bet} XC",
    "tosscoin.error": "Bạn đã thua: {bet} XC",
    "tosscoin.error": "đã có lỗi xảy ra!"
  }  
}
// bruh
async function onCall({ message, args, extra, getLang }) {
  const { Users } = global.controllers;
  const validChoices = ["heads", "h", "tails", "t"];

  const choice = args[0]?.toLowerCase();
  const bet = BigInt(args[1] || extra.minbet);

  if (!choice || !validChoices.includes(choice)) {
    const validStr = validChoices.join(", ");
    return message.reply(getLang("flipcoin.invalid_choice", { validChoices: validStr }));
  }

  try {
    const userMoney = await Users.getMoney(message.senderID) || null;
    if (userMoney === null) {
      return message.reply(getLang("tosscoin.error"));
    }
    if (BigInt(userMoney) < bet) {
      return message.reply(getLang("tosscoin.notEnoughMoney"));
    }
    if (bet < BigInt(extra.minbet)) {
      return message.reply(getLang("tosscoin.minmoney", { minBet: extra.minbet }));
    }

    await Users.decreaseMoney(message.senderID, bet);

    const isHeads = Math.random() < 0.5;
    const result = isHeads ? "heads" : "tails";
    const didWin = (choice === "h" || choice === "heads") ? isHeads : !isHeads;

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
  LangData,
  onCall
}
