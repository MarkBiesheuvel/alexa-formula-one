const cheerio = require('cheerio')
const AWS = require('aws-sdk')

const year = process.argv[2] || 2017

const response = require(`../ingest/standings_${year}.json`)

const items = []

const $ = cheerio.load(response.parse.text['*'])
const table = $('#Results_and_standings').parent().nextAll('table').eq(2)
let tr = table.find('.wikitable').find('tr')

while(tr.length > 0) {
  const position = tr.find('th').eq(0).text()

  if (position.match(/^\d+$/)) {
    const name = tr.find('td').eq(0).find('a').eq(1).text()
    const points = tr.find('th').eq(1).text()

    items.push({
      PutRequest: {
        Item: {
          Year: parseInt(year),
          Position: parseInt(position),
          DriverName: name,
          Points: parseInt(points)
        }
      }
    })
  }
  tr = tr.next()
}

const client = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' })
const batchSize = 25
for (let i = 0; i < items.length; i+= batchSize) {
  client.batchWrite({
    RequestItems: {
      FormulaOneStandings: items.slice(i, i + batchSize)
    }
  }, (error, response) => {
    if (error) {
      console.error(error)
    } else {
      console.log(response)
    }
  })
}
