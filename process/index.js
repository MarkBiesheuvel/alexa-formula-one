const cheerio = require('cheerio')

const year = process.argv[2] || 2017

const response = require(`../ingest/standings_${year}.json`)

const standings = []

const $ = cheerio.load(response.parse.text['*'])
const table = $('#Results_and_standings').parent().nextAll('table').eq(2)
let tr = table.find('.wikitable').find('tr')

while(tr.length > 0) {
  const position = tr.find('th').eq(0).text()

  if (position.match(/^\d+$/)) {
    const name = tr.find('td').eq(0).find('a').eq(1).text()
    const points = tr.find('th').eq(1).text()

    standings.push({ position, name, points })
  }
  tr = tr.next()
}

console.log(standings)
