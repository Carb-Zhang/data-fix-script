function csvEscape(field) {
    return '"' + String(field || '').replace(/\"/g, '""') + '"';
}

function arrayToCSV(arr) {
    return arr
        .map((item) => {
            // // 将项转换为字符串，检查是否以 '0' 开头
            // const strItem = String(item);
            // return strItem.startsWith('0') ? `="` + strItem.slice(1) + '"' : `"${strItem}"`;

            const strItem = csvEscape(item); // "0...", ""...."
            return strItem.startsWith(`"0`) ? `="0` + strItem.slice(2) : strItem;
        })
        .join(',');
}

// 示例字符串数组
const stringArray = ['1', '02', 3];

// 转换为 CSV 格式
const csvOutput = arrayToCSV(stringArray);
console.log(csvOutput);
