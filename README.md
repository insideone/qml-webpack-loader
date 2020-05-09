# qml-webpack-loader

Instructs webpack to emit the required qml as json provided by [qmlweb-parser](https://github.com/qmlweb/qmlweb-parser)

## Install

```
npm install --save-dev qml-webpack-loader
```

## Usage

```
import qmlData from './sample.qml'
```

### webpack.config.js

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.qml/,
        loader: 'qml-webpack-loader'
      }
    ]
  }
}
```

### options

* requireRegex - `require()` all strings that qualify regex
