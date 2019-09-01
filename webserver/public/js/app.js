const getWeather = (address) => {
    fetch('http://localhost:4000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return message1.textContent = data.error
            }

            message1.textContent = data.forecast
            message2.textContent = data.location + '(' + data.address + ')'

        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('#address')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    getWeather(location)
})