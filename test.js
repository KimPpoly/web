const fs = require('fs')
const jsonStr = '{"ip":"121.148.178.128","city":"Gwangju","region":"Gwangju","country":"KR","loc":"35.1547,126.9156","org":"AS4766 Korea Telecom","postal":"61240","timezone":"Asia/Seoul","readme":"https://ipinfo.io/missingauth"}';

// JSON 문자열을 JavaScript 객체로 파싱
const obj = JSON.parse(jsonStr);

// 객체의 프로퍼티를 순회하며 포맷팅
let formattedStr = '{\n';
for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
        formattedStr += `"${key}":"${obj[key]}",\n`;
    }
}
// 마지막 쉼표(,)와 줄바꿈(\n) 제거
formattedStr = formattedStr.slice(0, -2);
formattedStr += '\n}';

console.log(formattedStr);


fs.appendFile('test.txt', formattedStr + '\n', (err) => {
    if (err) {
        console.error('Error saving IP address:', err);
    } else {
        console.log('IP address saved successfully:', formattedStr);
    }
});