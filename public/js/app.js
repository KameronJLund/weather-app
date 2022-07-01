console.log('client side js loaded')

const weatherForm = document.querySelector('form')
const weatherFormSearch = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = weatherFormSearch.value

    console.log(location)

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    const weatherAddressUrl = '/weather?address=' + location

    fetch(weatherAddressUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }
            else {
                console.log(data)

                messageOne.textContent = '\nlocation: ' + data.location
                    + '\nlatitude: ' + data.latitude
                    + '\nlongitude: ' + data.longitude
                messageTwo.textContent = '\n' + data.description
                    + ' at ' + data.temperature + ' degrees'
            }
        })
    })
})