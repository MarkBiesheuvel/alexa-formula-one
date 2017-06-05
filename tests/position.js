let event = {
  'version': '1.0',
  'session': {
    'new': true,
    'sessionId': 'SessionId.2cb77e41-c594-471f-8a09-7a652e6ad4f6',
    'application': {
      'applicationId': 'amzn1.ask.skill.9e6cbddb-0097-41ba-929d-3209c8f23800'
    },
    'attributes': {},
    'user': {
      'userId': 'amzn1.ask.account.AGRJINY4C52VR7ONL674OELKJXOGA35IVAJ4NX24WMTPJAEBMAG2FIRBNA2M374TA46JQSO2SHP6MXINW3ONBLY26G54D5ZDPIKVWTXG6FBTBXAUPU24TOFHA2RY3ZPHFH3ELB6NJKNMYKULCSSLJTJAMPPCW3YQUFD5DOY7EVWLOOV5DOXTKKHDFXFNXMSUFA35HZBZLLPODGI'
    }
  },
  'request': {
    'type': 'IntentRequest',
    'requestId': 'EdwRequestId.a4c1f9b4-8f87-4f9d-bad3-b9ac71260fe7',
    'timestamp': '2017-06-04T07:40:53Z',
    'locale': 'en-US',
    'intent': {
      'name': 'getCurrentChampionshipStanding',
      'slots': {
        'position': {
          'name': 'position'
        },
        'year': {
          'name': 'year'
        }
      }
    }
  }
}

if (process.argv.length > 2) {
  event.request.intent.slots.position.value = parseInt(process.argv[2])
}
if (process.argv.length > 3) {
  event.request.intent.slots.year.value = parseInt(process.argv[3])
}

const index = require('../alexa/index')

index.handler(event, null, (error, response) => {
  if (error) {
    console.error(error)
  }
  console.log(response)
})
