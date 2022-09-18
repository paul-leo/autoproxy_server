import AIRPORTS from './url.js';
import { parseAirport } from './index.js';

export default async function getAllNode() {
    const list1 = await parseAirport(AIRPORTS[0]);
    const list2 = await parseAirport(AIRPORTS[1]);
    return [...list1, ...list2];
}
