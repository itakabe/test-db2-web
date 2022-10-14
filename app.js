//expressモジュールの読み込み
const express = require('express')
const port=3000
//expressのインスタンス化
const app = express()


// ejs を利用する
app.set("view engine", "ejs");

// /static で /publicディレクトリ配下の静的ファイルを利用できるようにする
app.use("/static", express.static(__dirname + "/public"));

// ルーティング
app.use("/", require("./routes/index.js"));

//8080番ポートでサーバーを待ちの状態にする。
//またサーバーが起動したことがわかるようにログを出力する
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

