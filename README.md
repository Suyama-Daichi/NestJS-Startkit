# Q. これは何？
A. NestJSのバックエンドテンプレートリポジトリです。

# Q. ユースケースは？
ログイン機能を必要とするアプリケーションに必要なAPIが実装されています。詳しくは[こちら](https://suyama-daichi.github.io/NestJS-Startkit/controllers/AuthController.html)をご覧ください。

また、Prismaのセットアップが済んでいますので、データベースとの接続・連携も可能です。

# データベースについて
- `yarn up:db` でデータベースコンテナを起動できます。
- `prisma/seeds`配下にシードファイルを用意し`yarn seed`コマンドを実行することで、事前にデータをInsertできます。

# How to develop
```bash
yarn install
yarn start:dev
```