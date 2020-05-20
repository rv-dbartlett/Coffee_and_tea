const fs = require('fs')
const hello = (req, res) => {
    res.send(loadPage());
}

const loadPage = () => {
    return fs.readFileSync('./src/index.html').toString();
}

module.exports = {
    hello,
    loadPage
}