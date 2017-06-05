const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' })

const get = (slots, key, defaultValue) => {
  if (key in slots && 'value' in slots[key]) {
    return parseInt(slots[key].value)
  } else {
    return defaultValue
  }
}

const respond = (callback, text) => {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text
      }
    }
  }

  console.log(JSON.stringify(response))

  callback(null, response)
}

exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event))

  const { intent } = event.request
  const { slots } = intent

  const position = get(slots, 'position', 1)
  const year = get(slots, 'year', 2017)

  console.log(`Position: ${position}`)
  console.log(`Year: ${year}`)

  dynamodb.query({
    TableName: 'FormulaOneDriverStandings',
    ConsistentRead: false,
    KeyConditions: {
      year: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [year]
      },
      position: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [position]
      }
    }
  }, (error, response) => {
    if (error) {
      return callback(error)
    }
    if (response.Count === 0) {
      const text = `No information found for position ${position} in ${year}`
      respond(callback, text)
    } else {
      const { name, points } = response.Items[0]
      const verb = (year === 2017) ? 'is' : 'was'
      const text = `${name} ${verb} in position ${position} in the ${year} world championship with ${points} points`
      respond(callback, text)
    }
  })
}
