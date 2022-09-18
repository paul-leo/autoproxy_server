import parseAirport from './parseAirport.js';
import AIRPORTS from './url.js';

async function randomANode() {
    const randomIndex = Math.round(Math.random());
    const nodeList = await parseAirport(AIRPORTS[randomIndex]);
    const nodeIndex = parseInt(Math.random() * nodeList.length);
    return nodeList[nodeIndex];
}
export default randomANode;
