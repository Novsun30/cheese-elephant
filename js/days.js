// 72小時
main();

async function main(){
    let weatherData = await fetchCityWeather();
    weatherData = weatherData["records"]["locations"][0]["location"];
    const locationOrder = [12, 9, 3, 13, 21, 0, 2, 20, 8, 10, 5, 17, 18 , 6, 7, 19, 4, 14, 16, 11, 1, 15];
    let selectDate = weatherData[0]["weatherElement"][0]["time"][0]["startTime"].split(" ")[0];
    let SelectTime = weatherData[0]["weatherElement"][0]["time"][0]["startTime"].split(" ")[1];
    renderDate(weatherData);
    renderTime(weatherData, selectDate);
    renderSelectTime(selectDate, SelectTime);
    renderTemperature(locationOrder, weatherData);
}

async function fetchCityWeather(){
    const respone = await fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=CWB-268894EB-8D9C-4ECD-B1E0-06BB594D8BD5&elementName=T&elementName=Wx&elementName=WS&elementName=WD&elementName=RH");
    const data = await respone.json();
    return data;
}

function renderTemperature(locationOrder, data){
    for(const index of locationOrder){
        const dataContainer = document.querySelector("div.data-container");
        const newDataDiv = document.createElement("div");
        newDataDiv.classList.add("data");
        dataContainer.appendChild(newDataDiv);

        const newNameDiv = document.createElement("div");
        const newNameP = document.createElement("p");
        newNameP.classList.add("city-name");
        newNameP.textContent = data[index]["locationName"];
        newDataDiv.appendChild(newNameDiv);
        newNameDiv.appendChild(newNameP);

        const newTemperatureDiv = document.createElement("div");
        newDataDiv.appendChild(newTemperatureDiv);

        const newWeatherImg = document.createElement("img");
        const newTemperatureP = document.createElement("p");
        const currentDayNight = dayNightChecker(data, 0, 0);
        const weatherImgValue = getWeatherImgValue(data, index, 0);
        const temperatureValue = getTemperatureValue(data, index, 0);
        newWeatherImg.src = `./image/weather_icons/${weatherImgValue}${currentDayNight}.svg`;
        newWeatherImg.classList.add("weather-img");
        newTemperatureP.textContent = `${temperatureValue}°C`;
        newTemperatureP.classList.add("temperature");
        newTemperatureDiv.append(newWeatherImg, newTemperatureP);
    }
}

function dayNightChecker(data, locationOrder, timeIndex){
    const time = data[locationOrder]["weatherElement"][0]["time"][timeIndex]["startTime"].split(" ")[1];
    if(time >= "18:00:00"|| time < "06:00:00"){
        return "_night";
    }
    return "";
}

function getWeatherImgValue(data, locationOrder, timeOrder){
    const value = data[locationOrder]["weatherElement"][0]["time"][timeOrder]["elementValue"][1]["value"];
    return value;
}

function getTemperatureValue(data, locationOrder, timeOrder){
    const value = data[locationOrder]["weatherElement"][1]["time"][timeOrder]["elementValue"][0]["value"];
    return value;
}

function renderDate(data){
    const today = document.querySelector("p.today");
    const tomorrow = document.querySelector("p.tomorrow");
    const dayAfterTomorrow = document.querySelector("p.day-after-tomorrow");
    timeData = data[0]["weatherElement"][0]["time"];
    let todayValue = timeData[0]["startTime"].split(" ")[0].slice(5).replace("-", "/");
    today.textContent = todayValue;
    today.classList.add("dateActive");
    let nextTwoDays = []
    for(let i = 0; i < timeData.length; i++){
        if(todayValue === timeData[i]["startTime"].split(" ")[0].slice(5).replace("-", "/")){
            continue;
        }
        todayValue = timeData[i]["startTime"].split(" ")[0].slice(5).replace("-", "/");
        nextTwoDays.push(todayValue);
    }
    tomorrow.textContent = nextTwoDays[0];
    dayAfterTomorrow.textContent = nextTwoDays[1];
    today.addEventListener("click", changeDateParam);
    tomorrow.addEventListener("click", changeDateParam);
    dayAfterTomorrow.addEventListener("click", changeDateParam);
    today.data = data;
    tomorrow.data = data;
    dayAfterTomorrow.data = data;
}

function changeDateParam(){
    const datePreviousActive = document.querySelector("p.dateActive");
    datePreviousActive.classList.remove("dateActive");
    this.classList.add("dateActive");
    let date = document.querySelector("p.dateActive").textContent.replace("/", "-");
    let time = document.querySelector("p.timeActive").textContent;
    changeTimeSection(this.data, date);
    date = document.querySelector("p.dateActive").textContent.replace("/", "-");
    time = document.querySelector("p.timeActive").textContent;
    changeTemperature(this.data, date, time);
    changeWeatherImg(this.data, date, time);
    showSelectTime(date, time);
}

function changeTimeParam(){
    const timePreviousActive = document.querySelector("p.timeActive");
    timePreviousActive.classList.remove("timeActive");
    this.classList.add("timeActive");
    const date = document.querySelector("p.dateActive").textContent.replace("/", "-");
    const time = document.querySelector("p.timeActive").textContent;
    changeTemperature(this.data, date, time);
    changeWeatherImg(this.data, date, time);
    showSelectTime(date, time)
}

function changeTimeSection(data, date){
    const allTimeObject = data[0]["weatherElement"][0]["time"];
    targetArray = []
    for(let i = 0; i < allTimeObject.length; i++){
        const targtDate = allTimeObject[i]["startTime"].split(" ")[0].slice(5)
        const time = allTimeObject[i]["startTime"].split(" ")[1].slice(0, 2)
        if(targtDate === date){
            targetArray.push(time)
        }
    }
    const timeDiv = document.querySelector("div.time");
    while(timeDiv.lastChild != null){
        timeDiv.removeChild(timeDiv.lastChild)
    }
    let timeElementCounter = 0;
    for(const time of targetArray){
        const timeDiv = document.querySelector("div.time")
        const newTimeP = document.createElement("p");
        newTimeP.textContent = time;
        if(timeElementCounter === 0){
            newTimeP.classList.add("timeActive")
        }
        newTimeP.addEventListener("click", changeTimeParam);
        newTimeP.data = data;
        timeDiv.appendChild(newTimeP);
        timeElementCounter++;
    }
}

function showSelectTime(date, time){
    date = date.replace("-", "/")
    time =  time + ":00"
    const selectTimeP = document.querySelector("p.select-time");
    selectTimeP.textContent = `預測時間： ${date} ${time}`;
}

function changeTemperature(data, date, time){
    const locationOrder = [12, 9, 3, 13, 21, 0, 2, 20, 8, 10, 5, 17, 18 , 6, 7, 19, 4, 14, 16, 11, 1, 15];
    const allTemperatureP = document.querySelectorAll("p.temperature");
    let targetTimeIndex = 0
    for(let i = 0; i < data[0]["weatherElement"][1]["time"].length; i++){
        const targetArray = data[0]["weatherElement"][1]["time"][i]["dataTime"].split(" ")
        const targetDate = targetArray[0].slice(5);
        const targetTime = targetArray[1].slice(0, 2);
        if(targetDate === date && targetTime === time){
            targetTimeIndex = i;
            break;
        }
    }
    let counter = 0;
    for(const index of locationOrder){
        const timeValue = data[index]["weatherElement"][1]["time"][targetTimeIndex]["elementValue"][0]["value"];
        allTemperatureP[counter].textContent = `${timeValue}°C`
        counter++;
    }

}

function changeWeatherImg(data , date ,time){
    const locationOrder = [12, 9, 3, 13, 21, 0, 2, 20, 8, 10, 5, 17, 18 , 6, 7, 19, 4, 14, 16, 11, 1, 15];
    const allWeatherImg = document.querySelectorAll("img.weather-img");
    let targetTimeIndex = 0
    for(let i = 0; i < data[0]["weatherElement"][0]["time"].length; i++){
        const targetArray = data[0]["weatherElement"][0]["time"][i]["startTime"].split(" ")
        const targetDate = targetArray[0].slice(5);
        const targetTime = targetArray[1].slice(0, 2);
        if(targetDate === date && targetTime === time){
            targetTimeIndex = i;
            break;
        }
    }
    let counter = 0;
    
    for(const index of locationOrder){
        const imgValue = data[index]["weatherElement"][0]["time"][targetTimeIndex]["elementValue"][1]["value"];
        const currentDayNight = dayNightChecker(data, index, targetTimeIndex)
        allWeatherImg[counter].src = `./image/weather_icons/${imgValue}${currentDayNight}.svg`
        counter++;
    }
}

function renderSelectTime(date, time){
    const selectTimeP = document.querySelector("p.select-time");
    date = date.split(" ")[0].slice(5).replace("-", "/");
    time = time.slice(0,5);
    selectTimeP.textContent = `預測時間： ${date} ${time}`;
}
function renderTime(data, targetDate){
    timeData = data[0]["weatherElement"][0]["time"];
    let timeArray = [];
    for(let i = 0; i < timeData.length ; i++){
        const startTime = timeData[i]["startTime"].split(" ")[0];
        if(targetDate === startTime){
            const time = timeData[i]["startTime"].split(" ")[1].slice(0, 2);
            timeArray.push(time);
        }
    }
    let timeElementCounter = 0;
    for(const time of timeArray){
        const timeDiv = document.querySelector("div.time")
        const newTimeP = document.createElement("p");
        newTimeP.textContent = time;
        if(timeElementCounter === 0){
            newTimeP.classList.add("timeActive")
        }
        newTimeP.addEventListener("click", changeTimeParam);
        newTimeP.data = data;
        timeDiv.appendChild(newTimeP);
        timeElementCounter++;
    }
}