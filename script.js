const search = document.querySelector('.busca');

search.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.querySelector('#searchInput').value;
    const apiKey = 'eb808389ed05a4071dd28d681dbf4d28'

    if (input !== '') {
        showWarning('Carregando...');
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&units=metric&lang=pt_BR`
        const results = await fetch(url);
        const json = await results.json();
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos a cidade!')
        }
    } else {
        clearInfo()
    }

});


const showInfo = (json) => {
    clearInfo();
    showWarning('');
    const result = document.querySelector('.resultado');
    const title = document.querySelector('.titulo');
    const tempInfo = document.querySelector('.tempInfo');
    const ventoInfo = document.querySelector('.ventoInfo');
    const ventoPonto = document.querySelector('.ventoPonto');
    const img = document.querySelector('.temp img');
    const body = document.createElement('img')

    title.innerHTML = `${json.name}, ${json.country}`;
    tempInfo.innerHTML = `${json.temp} <sup>ºC</sup>`;
    ventoInfo.innerHTML = `${json.windSpeed} <span>km/h</span>`;
    img.setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    ventoPonto.style.transform = `rotate(${json.windAngle - 90}deg)`
    result.style.display = 'block';
}

const clearInfo = () => {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none'
}

const showWarning = (msg) => {
    const warning = document.querySelector('.aviso');
    warning.innerHTML = msg;
}

