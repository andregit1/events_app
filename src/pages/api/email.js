import path from 'path'
import fs from 'fs'

// access our data
// extract our data (AllEvents)
// res 404 if there are no AllEvents
// AllEvents - loop through them and identify the eventId
// add the email into emails_registered, only if that email doesn't exist
// check the format email

function buildPath() {
  return path.join(process.cwd(), 'data', 'data.json')
}

function extractData(filepath) {
  const jsonData = fs.readFileSync(filepath)
  const data = JSON.parse(jsonData)
  return data
}

export default function handler(req, res) {
  const {method} = req;
  

  const filepathh = buildPath()
  const {event_categories, allEvents} = extractData(filepathh)

  if (!allEvents) {
    return res.status(400).json({
      status: 404,
      message: 'Events data not found'
    })
  }

  if (method === "POST") {
    const {email, eventId} = req.body

    if (!email | !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
    }

    const newAllEvents = allEvents.map(ev => {
      if(ev.id === eventId) {
        if(ev.emails_registered.includes(email)) {
          res.status(201).json({
            message: 'This email has already been registered'
          })
        }

        return {
          ...ev, emails_registered: [...ev.emails_registered, email]
        }
      }
      return ev
    })

    fs.writeFileSync(filepathh, JSON.stringify({event_categories, allEvents: newAllEvents}))

    res.status(200).json({message: `You has been registered succesfully with email: ${email}`})
  }
}