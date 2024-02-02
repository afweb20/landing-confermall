const replace = require("replace-in-file");
const fs = require("fs-extra");
const supportedLangs = require("./src/scripts/supportedLangs");

async function replaceFavicon() {
  for (let i = 0; i < supportedLangs.length; i++) {
    const lang = supportedLangs[i];

    try {
      await fs.copy("dist/favicon.ico", `dist/${lang}/favicon.ico`);
      console.log(`success! dist/favicon.ico -> dist/${lang}/favicon.ico`);
    } catch (err) {
      console.error(err);
    }
  }

  fs.remove("dist/favicon.ico", err => {
    if (err) return console.error(err);
    console.log("success! removed dist/favicon.ico");
    setCorrectUrlstoFiles("../favicon.ico", "./favicon.ico");
  });
}

async function replaceCssItem(file) {
  for (let i = 0; i < supportedLangs.length; i++) {
    const lang = supportedLangs[i];

    try {
      await fs.copy(`dist/${file}.css`, `dist/${lang}/${file}.css`);
      console.log(`success! dist/${file}.css -> dist/${lang}/${file}.css`);
    } catch (err) {
      console.error(err);
    }
  }

  fs.remove(`dist/${file}.css`, err => {
    if (err) return console.error(err);
    console.log(`success! removed dist/${file}.css`);
    setCorrectUrlstoFiles(`../${file}.css`, `./${file}.css`);
  });
}

async function replaceJsItem(file) {
  for (let i = 0; i < supportedLangs.length; i++) {
    const lang = supportedLangs[i];

    try {
      await fs.copy(`dist/${file}.js`, `dist/${lang}/${file}.js`);
      console.log(`success! dist/${file}.js -> dist/${lang}/${file}.js`);
    } catch (err) {
      console.error(err);
    }
  }

  fs.remove(`dist/${file}.js`, err => {
    if (err) return console.error(err);
    console.log(`success! removed dist/${file}.js`);
    setCorrectUrlstoFiles(`../${file}.js`, `./${file}.js`);
  });

  fs.remove(`dist/${file}.js.LICENSE.txt`, err => {
    if (err) return console.error(err);
    console.log(`success! removed dist/${file}.js.LICENSE.txt`);
  });
}

async function replaceAssets() {
  for (let i = 0; i < supportedLangs.length; i++) {
    const lang = supportedLangs[i];

    try {
      await fs.copy("dist/assets", `dist/${lang}/assets`);
      console.log(`success! dist/assets -> dist/${lang}/assets`);
    } catch (err) {
      console.error(err);
    }
  }

  fs.remove("dist/assets", err => {
    if (err) return console.error(err);
    console.log("success! removed dist/assets");
    setCorrectUrlstoFiles(/\.\.\/assets/g, "./assets");
  });
}

function setCorrectUrlstoFiles(from, to) {
  const options = {
    files: getHtmlFiles(),
    from: from,
    to: to,
  };

  try {
    let changedFiles = replace.sync(options);
    console.log("Modified files:", changedFiles);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

function replaceCss(array) {
  for (let i = 0; i < array.length; i++) {
    const file = array[i];

    replaceCssItem(file);
  }
}

function replaceJs(array) {
  for (let i = 0; i < array.length; i++) {
    const file = array[i];

    replaceJsItem(file);
  }
}

function getHtmlFiles() {
  var htmlArray = [];

  for (let i = 0; i < supportedLangs.length; i++) {
    const lang = supportedLangs[i];
    htmlArray.push(`dist/${lang}/**/*.html`);
  }

  return htmlArray;
}

async function replaceIndexHtml() {
  try {
    await fs.copy("src/index.html", "dist/index.html");
    console.log("success! src/index.html -> dist/index.html");
  } catch (err) {
    console.error(err);
  }
}

replaceFavicon();
replaceCss(["landing-confermall"]);
replaceJs(["landing-confermall", "additional-script"]);
replaceAssets();

replaceIndexHtml();