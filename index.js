const https = require('https')
const http = require('http')

const devMode = true

const configs = {
    dev: {
        uri: 'https://uchebarutualfa',
    },
    prod: {
       uri: 'https://shmmhost.ru/mohonov/uchebaru'
    }
}

const config = devMode ? configs.dev : configs.prod

let lastDate = formatDate(Date.now())

sendRequest()

console.log(lastDate)
lastDate = formatDate(Date.now())

setInterval(() => {
    sendRequest()

    console.log(lastDate)
    lastDate = formatDate(Date.now())
},  5 * 60  * 1000)

function sendRequest() {
    https.get(`${config.uri}/?dateFrom=${lastDate}`, res => {
        console.log(res)
        console.log(`Request: ${config.uri}/?dateFrom=${lastDate}`)
    })
}

function formatDate(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1 < 10) ? '0' + date.getMonth() + 1 : date.getMonth() + 1
    const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
    const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
    const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
    const seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

