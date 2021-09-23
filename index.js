const fs = require('fs')
const { getString } = require('./src/bezier')

function start() {
    const str = getString([0, 20], [20, 0], [0, 0], 'px', false, true)
    fs.writeFileSync('./out.txt', str)
    console.log(str)
}

start()