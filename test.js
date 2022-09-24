import {
    addBlackDomain,
    removeDomain,
    getBlackList,
} from './modules/blackList/index.js';

console.log(await addBlackDomain('a.com','work'));
console.log(await addBlackDomain('b.com','home'));
console.log(await getBlackList());
console.log(await removeDomain('b.com'));
console.log(await getBlackList());
for (var i = 0; i < 10; i++) {
    console.log(await addBlackDomain(i + '1.com'));
}
