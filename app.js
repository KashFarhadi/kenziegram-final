const express = require('express')
const path = require('path')

const app = express()
const publicFolderPath = path.join(__dirname, 'public')

app.use(express.json())
app.use(express.static(publicFolderPath))

let users = []

// add POST request listener here
app.post('/api/user', (req, res) => {
  // console.log(res.body) // this is a server side console, will show in terminal

  let taken = false   // for the first time through, Set it to false
      // because when the array is empty  it will skip through the for loop
      // we want to push anything into the array since its impossible to have duplicates

  for (user of users) {
    if (user.username === req.body.username) {
      taken = true
      break
    } else {
      taken = false
    }
  }
  if (taken) {
    res.status(409).send()        
    //.send() accepts an optional parameter which lets you specify the request's body; this is primarily used for requests such as PUT. If the request method is GET or HEAD, the body parameter is ignored and the request body is set to null
    throw new Error ("Username is  Taken") 
  } else {
    req.body.id = Math.random() * (10 ^16)   // give random IDs to req.body
    users.push(req.body)
    res.status(201).send()
    console.log(users)
  }
})

let port = 3000     // so that we cna pass it into the app.listen function below

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

// make sure you go to http://localhost:3000/ to see this page from the server