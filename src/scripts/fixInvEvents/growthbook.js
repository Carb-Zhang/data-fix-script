function hashFnv32a(str) {
    let hval = 0x811c9dc5;
    const l = str.length;
    for (let i = 0; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    return hval >>> 0;
}

function hash(seed, value) {
    return (hashFnv32a(value + seed) % 1000) / 1000;
}

const flag = 'cb-6047_audit_trail_revamp';
const rollout = 0.05;

const whitelist = [
    'snax',
    'bingscafe',
    'nendacafe',
    'naskencoffee',
    'impulsegaming',
    'tipsytownempire',
    'creativemart',
    'thecave',
    'happyday_2019',
];

export function isOn(business) {
    if (whitelist.includes(business)) {
        return true;
    }
    const n = (0, hash)(flag, business);
    if (n === null) return false;
    return n <= rollout;
}
