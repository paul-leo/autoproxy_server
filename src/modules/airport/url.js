export default function getUrls() {
    let AIRPORTURLS = process.env.AIRPORTURLS;
    console.log('AIRPORTURLS', AIRPORTURLS);
    try {
        AIRPORTURLS =
        AIRPORTURLS.split('|').map((item) => {
            return item.trim();
        });
    } catch (error) {
        console.log(error);
        AIRPORTURLS = [];
    }
    console.log('AIRPORTURLS', AIRPORTURLS);
    return AIRPORTURLS;
}
