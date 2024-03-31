/** 短信过期时间，单位ms */
export const SMS_TIMEOUT = 5 * 60 * 1000;

/** 短信session过期时间，单位ms */
export const SMS_EXPIRE_TIME = 60 * 1000;

/** 短信模板名称 */
export const SMS_TEMPLATE_NAME = {
    CODE: 'code',
    ALARM: 'alarm',
};

/** 短信模板ID */
export const smsTemplateId = {
    [SMS_TEMPLATE_NAME.CODE]: {
        china: 496908,
        default: 497278,
    },
    [SMS_TEMPLATE_NAME.ALARM]: {
        china: 497287,
        default: 497281,
    },
};

export const TENCENT_SMS_APP_ID = process.env.TENCENT_SMS_APP_ID;
export const TENCENT_SMS_SECRET_ID = process.env.TENCENT_SMS_SECRET_ID;
export const TENCENT_SMS_SECRET_KEY = process.env.TENCENT_SMS_SECRET_KEY;
