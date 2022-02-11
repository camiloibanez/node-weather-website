const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const iconImage = document.querySelector('img')
const myLocationButton = document.querySelector('#myLocation')

const showProcessing = () => {
    messageOne.textContent = 'Processing your request...'
    messageTwo.textContent = ''
    iconImage.style.visibility = 'hidden'
}

const fetchAndShowData = (endpoint, lat, long) => {
    fetch(endpoint).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location || `${lat}, ${long}`
                messageTwo.textContent = data.forecast
                iconImage.style.visibility = 'visible'
                iconImage.src = data.icon
            }
        })
    })
}

weatherForm.addEventListener('submit', (e) => {  // e -> event
    e.preventDefault()

    const location = search.value

    let endpoint = '/weather?address=' + location

    showProcessing()

    fetchAndShowData(endpoint)

})

myLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    showProcessing()

    navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude        

        let endpoint = `/weather/myLocation?lat=${latitude}&long=${longitude}`

        fetchAndShowData(endpoint, latitude, longitude)

        search.value = ''
    })
})