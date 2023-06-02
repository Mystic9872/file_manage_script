const express = require('express');
const mysql = require('mysql');
const http = require('http');
const path = require('path');
const fs = require('fs');
const dbconfig = require('./config/dbconfig.json');
const app = express();
const bodyParser = require('body-parser');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
const crypto = require('crypto');const e = require('express');

//false:노드의 querystring 모듈을 사용하여 쿼리스트링 해석
app.use(bodyParser.urlencoded({extended:false})); 

//json 타입으로 파싱하도록 설정
app.use(bodyParser.json());

//app.use('요청경로', express.static('실제경로'));
app.use('/',express.static(path.join(__dirname, '/css')));
app.set('port',8080);

//데이터 활용하기 위해 뷰엔진 사용
//https://yahohococo.tistory.com/43 참고
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

const key = '!$#%^H#%$^#$RE#@#^UY'

//세션 설정
app.use(session({
    secret : key,
    resave : false,
    saveUninitialized : false,
    cookie: {
        httpOnly : true,
        secure : true
    }
}));

// DB 연결
const connection = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
});
connection.connect();

//메인 페이지 접속
app.get('/', (req, res)=>{
    var name = res.cookie.name;
    res.render('main');
});

app.get('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    res.render('login');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);
    const sql = 'SELECT * FROM user WHERE name = "'+username+'" and password = "'+password+'"';
    console.log(sql);
    connection.query(sql, (error, results, fields) => {
      console.log(results);
      if (error) throw error;
        
      if (results.length === 0) {

        res.send('Invalid username or password.');
      } else {
        res.render('xss');
      }
    });
  });

//xss사이트 접속
app.get('/xss',(req,res)=>{
    res.render('/xss');
});
//서버 구동
const server = http.createServer(app);
server.listen(app.get('port'),()=>{console.log("8080포트 연결중")});