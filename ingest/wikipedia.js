const fs = require('fs')
const https = require('https')

const year = process.argv[2] || 2017
const fd = fs.openSync(`./ingest/standings_${year}.json`, 'w')

const host = 'en.wikipedia.org'
const path = `/w/api.php?action=parse&format=json&page=${year}_Formula_One_season`

const request = https.request({ host, path }, (response) => {
  // Write chunk to file
  response.on('data', (chunk) => fs.writeSync(fd, chunk))
  // Close file
  response.on('end', () => fs.closeSync(fd))
})

request.on('error', (error) => {
  console.error(`Problem with request: ${error.message}`);
})
request.end()
