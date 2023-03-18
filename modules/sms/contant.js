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

export const TENCENT_SMS_APP_ID = "1400294742";
export const TENCENT_SMS_SECRET_ID = 'AKIDFJ7h2BWr7BzYsxIR1QcZGj13qX2Iw4bu';
export const TENCENT_SMS_SECRET_KEY = 'FKH1Wlmb9XgkdGdleIm3FF0VlnaJqLdg';
