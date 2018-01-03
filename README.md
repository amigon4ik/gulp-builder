# gulp-builder

Gulp builder allows to minify all resources (CSS, JS) to few files. Also the builder allows to combine all fonts in one folder and replace URLs in css files automatically.

## Usage

config.json
```
"build": {
  "vendors": {
    "bootstrap": {
      "scripts": [
        "./node_modules/bootstrap/dist/js/bootstrap.js"
      ]
    },
    "font-awesome": {
      "styles": [
        "./node_modules/font-awesome/css/font-awesome.css"
      ],
      "fonts": [
        "./node_modules/font-awesome/fonts/**"
      ]
    }
  },
  "app": {
    "sass": [
      "./sass/app.scss"
    ],
    "scripts": [
      "./js/main.js"
    ]
  }
}
```
