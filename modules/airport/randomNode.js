import parseAirport from './parseAirport.js';
import AIRPORTS from './url.js';

const cnKeyWords = ['hk', '香港', '新加坡', '台湾', '澳门'];
function hasCnKeyword(label) {
    return cnKeyWords.some((keyword) => {
        return label.indexOf(keyword) > -1;
    });
}

async function randomANode() {
    const randomIndex = Math.round(Math.random());
    let nodeList = await parseAirport(AIRPORTS[randomIndex]);
    nodeList = nodeList.filter(({ label }) => {
        return label && hasCnKeyword(label);
    });
    const nodeIndex = parseInt(Math.random() * nodeList.length);
    return nodeList[nodeIndex];
}

export default randomANode;
