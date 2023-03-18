import { sendCode, sendSms } from '../modules/sms/index.js';

sendSms('+8618602174183', 'alarm', ['您的电脑']).then((res, err) =>
    console.log(res, err)
);

