const chalk = require('chalk')

chalkTheme = (color, text) => {
    if (color === 'blue') {
        return chalk.blue.inverse.bold(text)
    } if (color === 'green') {
        return chalk.green.inverse.bold(text)
    } if (color === 'red') {
        return chalk.red.inverse.bold(text)
    }
}

module.exports = chalkTheme