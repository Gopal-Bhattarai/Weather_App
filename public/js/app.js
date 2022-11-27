const searchText = document.querySelector('#searchText');
const searchBtn = document.querySelector('#searchBtn');
const forecast = document.querySelector('.forecast');
const location2 = document.querySelector('.location');

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const city = searchText.value;

    forecast.textContent = "Loading...";
    location2.textContent = "";
    // console.log(city);
    fetchData(city)
})


const fetchData = (city) => {
    fetch(`http://localhost:3000/weather?city=${city}`)
    .then((response)=> {
        response.json().then((data)=>{
            forecast.innerHTML = data.forecast;
            location2.innerHTML = data.location;
        })
    })
}
