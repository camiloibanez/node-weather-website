const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const iconImage = document.querySelector('img')

weatherForm.addEventListener('submit', (e) => {  // e -> event
    e.preventDefault()

    const location = search.value

    let endpoint = '/weather?address=' + location

    messageOne.textContent = 'Processing your request...'
    messageTwo.textContent = ''
    iconImage.style.visibility = 'hidden'

    fetch(endpoint).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                iconImage.style.visibility = 'visible'
                iconImage.src = data.icon
            }
        })
    })
})