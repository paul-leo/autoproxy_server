import AIRPORTS from './url.js';
import { parseAirport } from './index.js';

export default async function getAllNode() {
    const [list1, list2] = await Promise.all(parseAirport(AIRPORTS[0]), parseAirport(AIRPORTS[1]));
    return [...list1, ...list2];
}
