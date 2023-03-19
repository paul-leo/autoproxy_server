import AIRPORTS from './url.js';
import { parseAirport } from './index.js';

export default async function getAllNode() {
    try {
        let res = [];
        await Promise.all(
            AIRPORTS.map(async (item) => {
                try {
                    const list = await parseAirport(item);
                    res = [...res, ...list];
                    return list;
                } catch (error) {
                    console.log(error);
                    return [];
                }
            })
        );

        return res;
    } catch (error) {
        console.log(error);
    }
}
