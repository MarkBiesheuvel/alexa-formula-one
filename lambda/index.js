const drivers = [
    {name: 'Sebastian Vettel', team: 'Ferrari', points: 129},
    {name: 'Lewis Hamilton', team: 'Mercedes', points: 104},
    {name: 'Valtteri Bottas', team: 'Mercedes', points: 75},
    {name: 'Kimi Raikkonen', team: 'Ferrari', points: 67},
    {name: 'Daniel Ricciardo', team: 'Red Bull', points: 52},
    {name: 'Max Verstappen', team: 'Red Bull', points: 45}
]

exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event))

  const { intent } = event.request
  const { slots } = intent

    // Default to championship leader
  let position = 1

  if ('position' in slots && 'value' in slots.position) {
    position = slots.position.value
  } else if ('driver' in slots) {
    const regex = new RegExp(slots.driver.value, 'i')
    position = 1 + drivers.findIndex(d => d.name.match(regex))
  }

  console.log(position)

    // Get driver information
  const { name, team, points } = drivers[position - 1]

  const text = `${name} from ${team} is in position ${position} in the world championship with ${points} points`

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
