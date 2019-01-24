const userCreateForm = document.getElementById('user-create-form')
const userCreateSubmitButton = userCreateForm.querySelector(
  "button[type='submit']"
)

userCreateSubmitButton.addEventListener('click', function submitHander(event) {
  event.preventDefault()

  let userInput = document.getElementsByTagName('input')
  let input = [] // this is just ONE WAY to combine all the inputs.
  // [whole_name].value is for loop syntax, we use it.

  for (let currentInput of userInput) {
    console.log(currentInput)
    console.log(currentInput.value)

    input.push(currentInput.value)
  }

  // it doesn't grab this information from the form in HTML
  // can make these whatever I want. You just made brand new variables.

  let username = input[0]
  let email = input[1]
  let happyplace = input[2]
  let firstpet = input[3]

  let newUser = new User(username, email, happyplace, firstpet)
  let formattedNewUser = JSON.stringify(newUser)

  // stack overflow: https://stackoverflow.com/questions/39565706/post-request-with-fetch-api
  fetch("/api/user/", {
    // this is in the readme, receive post received at the pathin instructions
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // we already stringified our json, otherwise we would do this with all our fields.
    //  body: JSON.stringify({
    //   name: myName,
    //   email: myEmail
    // etc etc
    // })

    body: formattedNewUser
  }).then(response => {
    //do something awesome that makes the world a better place
    if (response.status === 201) {
      alert('Success!')
    } else if (response.status === 409) {
      alert('Username is Taken fool!')
    }
  })
  console.log('hi')
})

// MAKE NEW CLASSES IN A DIFFERENT FILE ON THE JOB

class User {
  constructor (username, email, happyplace, firstpet) {
    this.username = username
    this.email = email
    this.happyplace = happyplace
    this.firstpet = firstpet
  }
}
