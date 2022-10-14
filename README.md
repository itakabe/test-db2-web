# DB2接続確認用サンプルサイト
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## はじめに

Node.jsにて動作しますので、テスト実行する場合は事前に [ダウンロードサイト](https://nodejs.org/ja/download/) よりNode.jsのインストーラを取得・インストールを行ってください。

インストール後、`cd test-db2-web` にて本ディレクトリに移動し、以下コマンドを実行します。
```bash

npm i # 前提モジュールのインストール
npm run dev # Webサイト起動(デバック実行)
```
Webサイトが正常に起動すると、`Server running on port: 3000` と表示されますので、ブラウザにて [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## サイト構成

* `/` - トップページ
* `/version` - 接続先DB2のバージョン表示(DB2接続ができない場合はエラーとなります)

その他、DB2からデータ取得して表示するページを実装予定です。

## DB2接続について
IBMにて提供している`ibm_db`モジュールにてDB2接続を行います。
`routes/index.js`に接続先情報を直書きしておりますので適宜修正を行ってください。

## 補足
### DB2テスト用インスタンスについて
Dockerでテスト用DB2インスタンスを立てて接続テストが可能です。起動方法は以下コマンドを参考にしてください。
```bash
sudo docker run -itd --name db2 \
  --privileged=true \
  -e DB2INST1_PASSWORD=password \
  -e DBNAME=testdb
  -e LICENSE=accept \
  -v /home/issei/db2fs:/database \
  -p 50000:50000 \
  ibmcom/db2
```
ホスト側の `/home/issei/db2fs` ディレクトリとコンテナ内のデータベース保存先をマッピングして、データの永続化を実施しています。

接続確認方法
```bash
sudo docker exec -ti db2 bash -c "su - db2inst1"
```
`db2inst1` ユーザーにてコンテナにログインされますので、`db2`コマンドなどで直接DB操作が可能です。

停止方法
```bash
sudo docker stop db2
sudo docker rm db2
```
次回起動時にコンテナが残っていると失敗するため、削除をお忘れなく。

## 参考サイト

### 公式

* [Create Next App | Next.js](https://nextjs.org/docs/api-reference/create-next-app)
* [ibm_db - npm](https://www.npmjs.com/package/ibm_db)
* [node-ibm_db ドライバーのインストールの検証 - IBM Documentation](https://www.ibm.com/docs/ja/db2/11.5?topic=nodejs-verifying-node-db-driver-installation)
* [ibmcom/db2 - Docker Image | Docker Hub](https://hub.docker.com/r/ibmcom/db2)

### ブログなど

* [Node.js + node-ibm_db で Db2 に接続してSELECT文を実行する - Qiita](https://qiita.com/mi-kana/items/35433d6f3a08ec5d6bfe)
* [node.jsでdb2に接続 | 株式会社CONFRAGE ITソリューション事業部](https://confrage.jp/node-js%E3%81%A7db2%E3%81%AB%E6%8E%A5%E7%B6%9A/)
* [Expressにおけるejsの使い方 - Qiita](https://qiita.com/kamihork/items/1b13d2157979d1837849)
* [【備忘録】Docker版 Db2環境 取得手順 - Qiita](https://qiita.com/Haruka-Ogawa/items/0a4696ded4fa40e5e983)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
