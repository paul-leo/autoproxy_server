function Post(...args){
    console.log(args);
    return ()=>{}
}
export default class SMSController {
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
    @Post('/send')
    sendSms() {}
}
