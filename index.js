const https = require('https')
const http = require('http')

const devMode = false

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
    .then(res => console.log(res))
    .catch(err => console.log(err))

console.log(lastDate)
lastDate = formatDate(Date.now())

setInterval(() => {
    sendRequest()
        .then(res => {
            console.log(res)
            console.log(lastDate)
            lastDate = formatDate(Date.now())
        })
        .catch(err => {
            console.log(err)
        })
},  5 * 60  * 1000)

async function sendRequest() {
    console.log(`Request: ${config.uri}/?dateFrom=${lastDate}`)

    return new Promise((resolve, reject) => {
        https.get(`${config.uri}/?dateFrom=${lastDate}`, (res, err) => {
            if (err) reject(err)
            resolve(res)
        })
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

    return `${year}-${month}-${day}%20${hours}:${minutes}:${seconds}`
}

