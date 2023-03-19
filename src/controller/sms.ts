import { sendCode, verifyCode } from '../modules/sms';

const controller = {};
function Request(rout) {
    return function (
        target,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        controller[rout] = propertyKey;
    };
}

export default class SMSController {
    private app;
    private baseUrl;
    constructor(app, baseUrl) {
        if (!baseUrl) {
            return;
        }
        this.app = app;
        this.baseUrl = baseUrl;
        app.get('/' + this.baseUrl + '/:apiName', this.onRequest.bind(this));
        app.post('/' + this.baseUrl + '/:apiName', this.onRequest.bind(this));
    }
    private async onRequest(req, res, ...args) {
        const { apiName } = req.params;
        const methodName = apiName && controller[apiName];
        if (methodName)
            return res.send(
                JSON.stringify(
                    await this[methodName].bind(this)(req, res, ...args)
                )
            );
    }
    @Request('sendcode')
    async sendCode(req, res) {
        const { phone } = req.body || {};
        const result = await sendCode(phone);
        if (result instanceof Error) {
            return { code: -1, msg: result.message };
        }
        return { code: 0, data: result };
    }
    @Request('verifycode')
    async verifyCode(req, res) {
        const { phone, code } = req.body || {};
        const result = await verifyCode(phone, code);
        if (result instanceof Error) {
            return { code: -1, msg: result.message };
        }
        return { code: result ? 0 : -2, data: result };
    }
}
