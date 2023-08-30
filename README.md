# Lil-blog
![markdown](https://i.imgur.com/vH4D234.jpeg "Blog")
## 介紹
利用Nodejs、Express-handlebars、MySQL、Bootstrap建立的屬於我的部落的
## Features功能
•	擁有者可註冊帳號登入，編輯自己資料
•	新增、瀏覽、更新、刪除貼文與作品集
•	未來會新增於貼文按讚或留言的功能 & 站內訊息
•	未來也會將該網站佈署到雲端,供其他人瀏覽

## Entity Relationship Diagram
![markdown](https://i.imgur.com/UHTcpMJ.png)

## Environment Setup 環境建置
•	Node.js 18.16.0
•	nodemon
•	MySQL

## Install安裝與使用
```
1.	確認安裝Node.js和npm之後，將專案 clone 到本地
```
2.	透過終端機進入此專案資料夾，安裝所需NPM Packages：
```
npm install
```
3.	在SQL WorkBench 建立資料庫 (在workBench內輸入)：
```
create database lil-blog
```
4.	建立資料庫Table：
```
npx sequelize db:migrate
```
5.	在.env檔案中放入密碼(參考.env.example)：
```
IMGUR_CLIENT_ID= 你的密碼
JWT_SECRET= 你的密碼
```
6.	啟動伺服器
```
npm run start
```
7.	若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
```
App listening on http://localhost:3000
```
