const router = require("express").Router();
const ibmdb = require('ibm_db');
//DB接続文字列
const db_conn_str="DATABASE=testdb;HOSTNAME=localhost;UID=db2inst1;PWD=password;PORT=50000;PROTOCOL=TCPIP"

class Query {
  // str: description
  constructor(str, description) {
    this.str = str;
    this.description = description;
  }
}

const queryArr= [];
queryArr["version"] = new Query("SELECT T.SERVICE_LEVEL FROM TABLE(ENV_GET_INST_INFO()) AS T;","DB2バージョン表示"),
queryArr["table"] = new Query("SELECT * FROM SYSIBM.TABLES;","テーブル表示"),
queryArr["database"] = new Query("LIST DATABASE DIRECTORY;","データベースリスト表示"),


router.get("/", (req, res) => {
  const data = {
    title: "トップページ",
    text: "DB接続確認用のサンプルWebページです。以下リンクにてDB2との接続確認ができます。",
    items: [
      { name: `<a class="nav-link" href="/version">${queryArr["version"].description}</a>` },
      { name: `<a class="nav-link" href="/table">${queryArr["table"].description}</a>` },
      { name: `<a class="nav-link" href="/database">${queryArr["database"].description}</a>` },
    ]
  };
  // data を ejs に渡す
  res.render("index.ejs", data);
});

router.get("/version", (req, res) => {
  con_db(req,res,queryArr.version);
});

router.get("/table", (req, res) => {
  con_db(req,res,queryArr.table);
});

router.get("/database", (req, res) => {
  con_db(req,res,queryArr.database);
});


function con_db(req, res, query){
  ibmdb.open(db_conn_str, function (err, conn) {
    console.log('db connection started.');
    if (err) {
      console.log(err);
      res.status(500);
      res.render("index.ejs", {title: query.description, text: `DB接続に失敗しました。以下エラーをご確認ください。`, items: [{name: err}]});
      //res.json(err)
    }
    conn.query(query.str, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500);
        res.render("index.ejs", {title: query.description, text: `クエリの発行でエラーが発生しました。<br />発行クエリ：${query.str}`, items: [{name: err}]});
        //res.json(err)
      }

      //res.json(data);
      console.log(data);
      res.render("index.ejs", {title: query.description, text: `クエリの発行に成功しました。<br />発行クエリ：${query.str}`, items: [{name: JSON. stringify(data)}]});

      conn.close(function () {
        console.log('db connection closed.');
      });
    });
  });
}

module.exports = router;
