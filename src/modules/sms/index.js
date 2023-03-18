import tencentcloud from 'tencentcloud-sdk-nodejs';
import {
    TENCENT_SMS_SECRET_ID,
    TENCENT_SMS_SECRET_KEY,
    SMS_TEMPLATE_NAME,
    smsTemplateId,
    TENCENT_SMS_APP_ID,
} from './contant.js';
const SmsClient = tencentcloud.sms.v20210111.Client


const client = new SmsClient({
    credential: {
        secretId: TENCENT_SMS_SECRET_ID,
        secretKey: TENCENT_SMS_SECRET_KEY,
    },
    // 产品地域
    region: 'ap-guangzhou',
    // 可选配置实例
    profile: {
        httpProfile: {
            endpoint: 'sms.tencentcloudapi.com',
            // proxy: "http://127.0.0.1:8899" // http请求代理
        },
    },
});

/** 获取模板ID */
function getTemplateId(phone, name) {
    const isChina = phone.indexOf('+86') == 0;
    const localName = isChina ? 'china' : 'default';
    try {
        return smsTemplateId[name][localName];
    } catch (error) {
        return 0;
    }
}

/** 发送短信 */
export async function sendCode(phone, req = null) {
    if (!phone) {
        return new Error('参数不合法');
    }
    // 随机一个code
    const smscode = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
    const templateID = getTemplateId(phone, SMS_TEMPLATE_NAME.CODE);
    try {
        return await sendSms(phone, templateID, [smscode]);
        // 有请求的话
    } catch (error) {
        return error;
    }
}

/** 发送短信 */
export function sendSms(phone, template, sendParams) {
    var isChina = phone.indexOf('+86') == 0;
    var Sign = isChina ? 'FOCUSBE' : 'Focusbe';
    if (typeof template == 'string' && isNaN(Number(template))) {
        template = getTemplateId(phone, template);
    }
    const params = {
        /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
        // 应用 ID 可前往 [短信控制台](https://console.cloud.tencent.com/smsv2/app-manage) 查看
        SmsSdkAppId: TENCENT_SMS_APP_ID,
        /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名 */
        // 签名信息可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-sign) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-sign) 的签名管理查看
        SignName: Sign,
        /* 模板 ID: 必须填写已审核通过的模板 ID */
        // 模板 ID 可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-template) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-template) 的正文模板管理查看
        TemplateId: template.toString(),
        /* 模板参数: 模板参数的个数需要与 TemplateId 对应模板的变量个数保持一致，若无模板参数，则设置为空 */
        TemplateParamSet: sendParams,
        /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
         * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
        PhoneNumberSet: [phone],
        /* 用户的 session 内容（无需要可忽略）: 可以携带用户侧 ID 等上下文信息，server 会原样返回 */
        SessionContext: '',
        /* 短信码号扩展号（无需要可忽略）: 默认未开通，如需开通请联系 [腾讯云短信小助手] */
        ExtendCode: '',
        /* 国际/港澳台短信 senderid（无需要可忽略）: 国内短信填空，默认未开通，如需开通请联系 [腾讯云短信小助手] */
        SenderId: '',
    };
    console.log(phone, Sign, template, sendParams,params);
    return new Promise((resolve,reject)=>{
        client.SendSms(params, function (errMsg, response) {
            if (errMsg) {
                reject(errMsg );
                return;
            }
            resolve(response);
        });
    })
}
