FROM node:12-alpine

# /node_modules はデフォルトで NODE_PATH に通っているのでENV設定不要
# ENV NODE_PATH /node_modules

# /node_modules/.bin への PATH は通っていないため設定
ENV PATH $PATH:/node_modules/.bin

# ./package.json を service://node:/ にCOPYしてコンテナビルド時点で npm install してしまう
## node_modules のインストール先は /node_modules/ に設定
## モジュール追加したい場合は $ npm i --prefix '/'
COPY package.json /
COPY package-lock.json /
RUN npm config set prefix / && npm install && npm cache clean --force

# 作業ディレクトリ: ./ => service://node:/work/
WORKDIR /work/