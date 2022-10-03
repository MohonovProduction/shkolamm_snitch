const https = require('https')
const http = require('http')

const devMode = true

const configs = {
    dev: {
        uri: 'http://uchebarutualfa',
    },
    prod: {
       uri: 'https://shmmhost.ru/mohonov/uchebaru'
    }
}

const config = devMode ? configs.dev : configs.prod

let lastDate = formatDate(Date.now())

http.get(`${config.uri}/?dateFrom=${lastDate}`, res => {
    console.log(res)
    console.log(`Request: ${config.uri}/?dateFrom=${lastDate}`)
})

console.log(lastDate)
lastDate = formatDate(Date.now())

setInterval(() => {
    http.get(`${config.uri}/?dateFrom=${lastDate}`, res => {
        console.log(res)
    })

    console.log(lastDate)
    lastDate = formatDate(Date.now())
},  5 * 60  * 1000)

function formatDate(timestamp) {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1 < 10) ? '0' + date.getMonth() + 1 : date.getMonth() + 1
    const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

