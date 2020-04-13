console.log("Client side");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...'

    const location = search.value;
    // console.log(location);

    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {    //extract data from the url then run this function
    response.json().then((data) => { //passing parsed data
        if(data.error){
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location + " : " + data.forecast
        }
        
        })
    })
    
})