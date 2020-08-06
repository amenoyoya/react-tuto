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
|_ package.json # node package management file
|_ n # command alias: docker-compose run node $*
|_ Dockerfile # service://node docker build conf
|_ docker-compose.yml # docker compose
                      # - service://node <node:12-alpine>
                      #   - $ docker-compose run node <command> ...
                      #   - http://localhost:32300 => service://node:32300
```

### Setup
```bash
# build docker containers
## create user: worker (in service://node) => user id: $UID (same with current working user)
$ export UID && docker-compose build

# add execution permission to ./n
# ./n: $ docker-compose run --service-ports node $*
$ chmod +x ./n
```

***

## 0. Zero Server

参考: https://zeroserver.io/docs/

### Structure
```bash
./
|_ app/ # main app dir
|  |_ index.jsx # http://localhost:32300/ (React App)
|  |_ time.js # http://localhost:32300/ (Nodejs API)
|
|_ .babelrc # babel conf file
|_ package.json
|_ n
|_ Dockerfile
|_ docker-compose.yml
```

### app/time.js
```javascript
const moment = require("moment")
module.exports = (req, res) => {
  var time = moment().format('LT');   // 11:51 AM
  res.send({time: time })
}
```

### app/index.jsx
```javascript
import React from 'react'
export default class extends React.Component {
  static async getInitialProps(){
    var json = await fetch("/time")
      .then((resp) => resp.json())
      .catch(err => console.log(err))
    return {time: json.time}
  }
  render() {
    return <p>Current time is: {this.props.time}</p>
  }
}
```

### Execution
```bash
# Run zero server in ./app/
$ ./n zero app

# server: http://localhost:32300 => service://node:32300
```

***

## 1. How to build a movie search app using React Hooks

React + Hook で映画検索アプリを作成する

参考: [How to build a movie search app using React Hooks](https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/)

```bash
# create react project: hooked
$ ./n npx create-react-app hooked

# hooked/
# |_ public/ # document root
# |  |_ index.html
# |  :
# |
# |_ src/
# |  |_ App.css # styles
# |  |_ App.js # main script: handles the API request
# |  :
# |
# |_ package.json

# start development server
# $ ./n npm --prefix hooked start
$ ./n yarn --cwd hooked start

# => server: http://localhost:32300 => service://node:3000
```
