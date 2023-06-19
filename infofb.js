const config = {

  name: "infofb",

  description: "info account Facebook",

  usage: ["ifb"],

  credits: "Xavia Team - Tphat",

  cooldown: 5,

};

const langData = {

  vi_VN: {

    result:

      "Thông tin của ID: {uid}\nTên người dùng: {name}\nNgày tạo tài khoản: {created_time}\nNgày sinh: {birthday}\nTình trạng mối quan hệ: {relationship_status}\nSố lượt theo dõi: {follower}\nTick xanh: {tichxanh}\nQuốc gia: {locale}, {location}",

    missingInput: "Vui lòng nhập ID tài khoản Facebook của bạn",

    notFound: "Không tìm thấy dữ liệu.",

    error: "Đã xảy ra lỗi. Xin lỗi vì sự bất tiện này.",

  },

  ar_SY: {

    result:

      "معلومات الهوية: {uid}\nاسم المستخدم: {name}\nتاريخ إنشاء الحساب: {created_time}\nتاريخ الميلاد: {birthday}\nحالة العلاقة: {relationship_status}\nعدد المتابعين: {follower}\nعلامة التحقق الزرقاء: {tichxanh}\nالدولة: {locale}, {location}",

    missingInput: "يرجى إدخال معرف حساب Facebook الخاص بك",

    notFound: "لم يتم العثور على بيانات.",

    error: "حدث خطأ. نأسف على الإزعاج.",

  },

  en_US: {

    result:

      "ID: {uid}\nUsername: {name}\nAccount Created: {created_time}\nBirthday: {birthday}\nRelationship Status: {relationship_status}\nFollowers: {follower}\nVerified: {tichxanh}\nLocation: {locale}, {location}",

    missingInput: "Please enter your Facebook account ID",

    notFound: "Data not found.",

    error: "An error occurred. We apologize for the inconvenience.",

  },

};

// API https://sumiproject.space thank!

async function onCall({ message, args, getLang }) {

  try {

    const input = args[0]; 

    if (!input) return message.reply(getLang("missingInput"));

    const encodedInput = encodeURIComponent(input);

    const url = `https://sumiproject.space/facebook/getinfo?uid=${encodedInput}`;

    const res = await global.GET(url);

    const data = res?.data || {};

    if (Object.keys(data).length === 0) {

      return message.reply(getLang("notFound"));

    }

    const response = getLang("result", {

      uid: data.uid,

      name: data.name,

      created_time: data.created_time,

      birthday: data.birthday,

      relationship_status: data.relationship_status,

      follower: data.follower,

      tichxanh: data.tichxanh,

      location: data.location,

      locale: data.locale,

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

  onCall,

};

