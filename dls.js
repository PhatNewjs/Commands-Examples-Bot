const config = {

  name: "dls",

  description: "DLS player data search",

  usages: "dls <name footballer>",

  versions: "1.0.0-beta.api",

  cooldown: 5,

  credits: "Xavia Team"

};

const langData = {

  "vi_VN": {

    "result": `

               Thông tin cầu thủ {NAME}

    {PRICE} vàng || {HEIGHT}cm  

               

    SPE: {SPE}  STR: {STR} 

    ACC: {ACC}  TAC: {TAC} 

    STA: {STA}  PAS: {PAS} 

    CON: {CON}  SHO: {SHO} 

    Vị trí: {POI} | CLB hiện tại: Chelsea 

    Cập nhật dữ liệu ngày: {UDT} 

`,

    "notFound": "Không nhận dạng được dữ liệu! Vui lòng thử lại sau.",

    "error": "Đã có lỗi xảy ra lỗi!",

    "missingInput": "Không tìm thấy dữ liệu cầu thủ. API sẽ được cập nhật sau"

  },

  "ar_SY": {

    "result": `

              معلومات اللاعب {NAME}

    {PRICE} ذهب || {HEIGHT} سم

    

    SPE: {SPE}  STR: {STR}

    ACC: {ACC}  TAC: {TAC}

    STA: {STA}  PAS: {PAS}

    CON: {CON}  SHO: {SHO}

    

    الموقع: {POI} | النادي الحالي: تشيلسي

    تاريخ تحديث البيانات: {UDT}

`,

    "notFound": "تعذر التعرف على البيانات! يرجى المحاولة مرة أخرى في وقت لاحق.",

    "error": "حدث خطأ!",

    "missingInput": "لم يتم العثور على بيانات اللاعب. سيتم تحديث واجهة برمجة التطبيقات لاحقًا."

  },

  "en_US": {

    "result": `

               Player Information: {NAME}

    {PRICE} Gold || {HEIGHT}cm

    

    SPE: {SPE}  STR: {STR}

    ACC: {ACC}  TAC: {TAC}

    STA: {STA}  PAS: {PAS}

    CON: {CON}  SHO: {SHO}

    

    Position: {POI} | Current Club: Chelsea

    Data last updated on: {UDT}

`,

    "notFound": "Data not recognized! Please try again later.",

    "error": "An error occurred!",

    "missingInput": "Player data not found. API will be updated later."

  }

};

async function onCall({ message, args, getLang }) {

  try {

    const input = args.join(" ").toLowerCase();

    if (!input) return message.reply(getLang("missingInput"));

    const encodedInput = encodeURIComponent(input);

    const url = `https://dls-info-data.phathuynh18.repl.co/${encodedInput}`;

    const res = await global.GET(url);

    const playerData = res?.data || {};

    

    if (Object.keys(playerData).length === 0) {

      return message.reply(getLang("notFound"));

    }

    

    const response = getLang("result", {

      NAME: playerData.NAME,

      PRICE: playerData.PRICE,

      HEIGHT: playerData.HEIGHT,

      POI: playerData.POSITION, 

      SPE: playerData.SPE,

      STR: playerData.STR,

      ACC: playerData.ACC,

      TAC: playerData.TAC,

      STA: playerData.STA,

      PAS: playerData.PAS,

      CON: playerData.CON,

      SHO: playerData.SHO,

      UDT: playerData.UPDATE,

      FC: playerData.FC

    });

    

    return message.reply(response);

  } catch (e) {

    console.error(e);

    return message.reply(getLang("error"));

  }

}

export default {

  config,

  langData,

  onCall

};

