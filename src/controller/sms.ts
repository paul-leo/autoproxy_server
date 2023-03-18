function f() {
    console.log('f(): evaluated');
    return function (
        target,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log('f(): called');
    };
}


export default class SMSController {
    private app;
    private baseUrl;
    private controllers;
    constructor(app, baseUrl) {
        if (!baseUrl) {
            return;
        }
        this.app = app;
        this.baseUrl = baseUrl;
        this.controllers = [];
        app.get('/' + baseUrl + '/:apiName', async (req, res) => {
            console.log('get', req.params);
            if (this['']) return res.send('1');
        });
        app.post('/' + baseUrl + '/:apiName', async (req, res) => {
            console.log('post', req.params);
            return res.send('2');
        });
    }
    @f()
    sendSms() {}
}
