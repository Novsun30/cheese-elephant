// 一週統計
// location 0-21:
//      0:新竹縣, 1:金門縣, 2:苗栗縣, 3:新北市, 4:宜蘭縣, 5:雲林縣, 6:臺南市, 7:高雄市, 8:彰化縣, 9:臺北市, 10:南投縣, 11:澎湖縣, 12:基隆市, 13:桃園市, 14:花蓮縣, 15:連江縣, 16:臺東縣, 17:嘉義市, 18:嘉義縣, 19:屏東縣, 20:臺中市, 21:新竹市

// weatherElement:
//      0: 12小時降雨機率, 6: 天氣現象, 8: 最低溫度, 9: 紫外線指數, 12: 最高溫度

// 12小時降雨機率(PoP12h): data.records.locations[0].location[0-21].weatherElement[0].time[0-15].elementValue[0].value  unit:%

// 平均溫度(T): data.records.locations[0].location[0].weatherElement[1].time[0-15].elementValue[0].value  unit:oC

//weather_icon: https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/{day/night}/07.svg


let url_taiwan = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-25142137-EFE4-4F9E-9B46-D41BF5BD73D5";
async function getWeekdata(url){
    let response = await fetch(url);
    let data = await response.json();
    let cities = data.records.locations[0].location;
    let weatherElements = cities[0].weatherElement;
    console.log(weatherElements);
    let times = weatherElements[9].time;
    const weekdays = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."];
    document.getElementById("city").textContent = cities[0].locationName;
    
    let Ds = document.querySelectorAll(".D");
    let pop_index = 1;
    for(let i=0; i<7; i++){
        D_all = new Date(times[i].startTime);
        D_month = D_all.getMonth() + 1;

        D_date = D_all.getDate();
        D_day = weekdays[D_all.getDay()];
        Ds[i].textContent = D_month + " / " + D_date + "\n" + D_day;

        
        let PoP_day = weatherElements[0].time[pop_index].elementValue[0].value;
        let PoP_night = weatherElements[0].time[pop_index + 1].elementValue[0].value;
        if (parseInt(PoP_day) >= parseInt(PoP_night)){
            document.getElementById("PoP" + pop_index.toString()).textContent = PoP_day + "%";
        } else if(PoP_day == " " && PoP_night == " ") {
            document.getElementById("PoP" + pop_index.toString()).textContent = "--";
        } else {
            document.getElementById("PoP" + pop_index.toString()).textContent = PoP_night + "%";
        }
        pop_index += 2;
        
        let UVI = weatherElements[9].time[i].elementValue[1].value;
        document.getElementById("UVI" + (i+1).toString()).textContent = UVI;

    }
    
    for(let i=1; i<15; i++){
        let weather_icon = document.createElement("img");
        weather_icon.className = "weather_icon";
        let weather_icon_url = "https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/";
        let weather = weatherElements[6].time[i].elementValue[1].value;

        let minT = document.createElement("span");
        minT.textContent = weatherElements[8].time[i].elementValue[0].value;
        minT.style.color = "blue";

        let maxT = document.createElement("span");
        maxT.textContent = weatherElements[12].time[i].elementValue[0].value;
        minT.style.color = "red";

        let temp_range = minT + " - " + maxT;
        let temp_box = document.getElementById("temp_box" + i.toString());
        if(i % 2 !== 0){
            weather_icon.src = weather_icon_url + "day/" + weather + ".svg";
            temp_box.parentNode.insertBefore(weather_icon, temp_box);
            document.getElementById("temp_box" + i.toString()).appendChild(temp_range);
        } else {
            weather_icon.src = weather_icon_url + "night/" + weather + ".svg";
            temp_box = document.getElementById("temp_box" + i.toString());
            temp_box.parentNode.insertBefore(weather_icon, temp_box);
            document.getElementById("temp_box" + i.toString()).appendChild(temp_range);
            
        }
    }

}

getWeekdata(url_taiwan);