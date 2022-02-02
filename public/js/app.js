const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {  // e -> event
    e.preventDefault()

    const location = search.value

    let endpoint = '/weather?address=' + location

    messageOne.textContent = 'Processing your request...'
    messageTwo.textContent = ''

    fetch(endpoint).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})