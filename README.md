# frontend-tuto

参考: [2020年のフロントエンドマスターになりたければこの9プロジェクトを作れ](https://qiita.com/rana_kualu/items/915345b8f3f870cfe2aa)

## Environment

- OS: Ubuntu 20.04
- Editor: VSCode
- Docker: 19.03.12
    - docker-compose: 1.26.0

### Structure
```bash
./ # => service://node:/work/:rw
|_ package.json # node package management file => service://node:/package.json:rw
|_ package-lock.json # node package management lock file => service://node:/package-lock.json:rw
|_ Dockerfile # service://node docker build conf
|_ docker-compose.yml # docker compose
                      # - service://node <node:12-alpine>
                      #   - $ docker-compose run node <command> ...
                      #   - http://localhost:32300 => service://node:3000
```

### Setup
```bash
# build docker containers
$ docker-compose build

# add execution permission to ./n
# ./n: $ docker-compose run --service-ports $*
$ chmod +x ./n
```
