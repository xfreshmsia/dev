# Gulp Init
Automating your static website developement.

## Pre-requisites
- [Nodejs](https://nodejs.org/en/)

## Directory layout
```bash
|── app             # Contains all static files
|   |── **
|   |── index.html
|── dist            # Folder name can be changed in gulpfile.js `distFolder`)
|── package.json
|── gulpfile.js     # Automate scripts
```

### Getting started
1. Run `npm install` in the root project folder _(where package.json is located)._
2. Create `app` folder and put all static files _(html, js, css, etc..)_ in it. Make sure `index.html` is in root of `app` folder. 


### Automating - localhost
The app will automatically reload if you change any files in `app` folder. Pre-processing CSS is also available. [gulp-sass](https://github.com/dlmanning/gulp-sass#readme).
```bash
gulp
```

### Build
The build artifacts will be stored in the `dist` folder.
```bash
gulp build
```

1. Optimizing JS  
In any html files :
```html
<!--build:js js/main.min.js -->
<script src="js/one.js"></script>
<script src="js/two.js"></script>
<!-- endbuild -->
```
`one.js` and `two.js` is merged and uglified in `./dist/js/main.min.js` 

2. Optimizing CSS  
In any html files :
```html
<!--build:css css/styles.min.css-->
<link rel="stylesheet" href="css/styles.css">
<link rel="stylesheet" href="css/another-stylesheet.css">
<!-- endbuild -->
```
`styles.css` and `another-stylesheet.css` is merged and minified in `./dist/css/styles.min.css` 


