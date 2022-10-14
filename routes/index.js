const router = require("express").Router();
const ibmdb = require('ibm_db');
//DB接続文字列
const db_conn_str="DATABASE=testdb;HOSTNAME=localhost;UID=db2inst1;PWD=password;PORT=50000;PROTOCOL=TCPIP"

router.get("/", (req, res) => {
  const data = {
    title: "サンプルタイトル",
    items: [
      { name: "ABC" },
      { name: "DEF" },
      { name: "GHI" }
    ]
  };
  // data を ejs に渡す
  res.render("index.ejs", data);
});

router.get("/version", (req, res) => {
  ibmdb.open(db_conn_str, function (err, conn) {
    console.log('db connection started.');
    if (err) {
      console.log(err);
      res.render("index.ejs", {title: "DB接続エラー", items: [{name: err}]});
    }
    conn.query('SELECT T.SERVICE_LEVEL FROM TABLE(ENV_GET_INST_INFO()) AS T;', function (err, data) {
      if (err) {
        console.log(err);
        res.render("index.ejs", {title: "クエリエラー", items: [{name: err}]});
        //res.json(err)
      }

      //res.json(data);
      console.log(data);
      res.render("index.ejs", {title: "出力結果", items: [{name: JSON. stringify(data)}]});

      conn.close(function () {
        console.log('db connection closed.');
      });
    });
  });
});


module.exports = router;
