// 一週統計
// location 0-21:
//      0:新竹縣, 1:金門縣, 2:苗栗縣, 3:新北市, 4:宜蘭縣, 5:雲林縣, 6:臺南市, 7:高雄市, 8:彰化縣, 9:臺北市, 10:南投縣, 11:澎湖縣, 12:基隆市, 13:桃園市, 14:花蓮縣, 15:連江縣, 16:臺東縣, 17:嘉義市, 18:嘉義縣, 19:屏東縣, 20:臺中市, 21:新竹市

// weatherElement:
//      0: 12小時降雨機率, 6: 天氣現象, 8: 最低溫度, 9: 紫外線指數, 12: 最高溫度

// 12小時降雨機率(PoP12h): data.records.locations[0].location[0-21].weatherElement[0].time[0-15].elementValue[0].value  unit:%

// 平均溫度(T): data.records.locations[0].location[0].weatherElement[1].time[0-15].elementValue[0].value  unit:oC

//weather_icon: https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/{day/night}/07.svg


const city_dict = {
    "新竹縣" : "0", "金門縣" : "1", "苗栗縣" : "2", "新北市" : "3", "宜蘭縣" : "4", "雲林縣" : "5", "臺南市" : "6", "高雄市" : "7", "彰化縣" : "8", "臺北市" : "9", "南投縣" : "10", "澎湖縣" : "11", "基隆市" : "12", "桃園市" : "13", "花蓮縣" : "14", "連江縣" : "15", "臺東縣" : "16", "嘉義市" : "17", "嘉義縣" : "18", "屏東縣" : "19", "臺中市" : "20", "新竹市" : "21" 
};

const url_week = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-E1B0F331-8487-4EC8-A1F7-E0C54B701DBE";

getWeekdata(url_week, city_dict["臺北市"]);

let search_btn = document.querySelector(".header-search-btn");
search_btn.addEventListener("click", () => {
    document.getElementsByTagName("section")[0].innerHTML = "";
    let table = document.createElement("table");
    table.id = "table";
    document.getElementsByTagName("section")[0].appendChild(table);

    // create row
    for(let i=0; i<5; i++){
        let row = document.createElement("tr");
        row.id = "row" + (i+1).toString();
        document.getElementById(table.id).appendChild(row);
    }

    // row_data
    let r24_index = 1;
    let r3_index = 2;
    for(let i=0; i<8; i++){
        let head = document.createElement("th");
        head.id = "head" + (i+1).toString();
        document.getElementById(row1.id).appendChild(head);
        let r2c = document.createElement("td");
        r2c.id = "r2c" + (i+1).toString();
        document.getElementById(row2.id).appendChild(r2c);
        let r3c = document.createElement("td");
        r3c.id = "r3c" + (i+1).toString();
        document.getElementById(row3.id).appendChild(r3c);
        let r4c = document.createElement("td");
        r4c.id = "r4c" + (i+1).toString();
        document.getElementById(row4.id).appendChild(r4c);
        let r5c = document.createElement("td");
        r5c.id = "r5c" + (i+1).toString();
        document.getElementById(row5.id).appendChild(r5c);

        let head_cell = document.createElement("div");
        head_cell.className = "cell";
        let r2_cell = document.createElement("div");
        r2_cell.className = "cell";
        let r3_cell = document.createElement("div");
        r3_cell.className = "cell";
        let r4_cell = document.createElement("div");
        r4_cell.className = "cell";
        let r5_cell = document.createElement("div");
        r5_cell.className = "cell";

        if(i == 0){
            head_cell.id = "city";
            document.getElementById(head.id).appendChild(head_cell);

            r2_cell.textContent = "白天";
            document.getElementById(r2c.id).appendChild(r2_cell);

            r3_cell.textContent = "晚上";
            document.getElementById(r2c.id).appendChild(r3_cell);

            r4_cell.textContent = "降雨機率";
            document.getElementById(r2c.id).appendChild(r4_cell);
            
            r5_cell.textContent = "紫外線";
            document.getElementById(r2c.id).appendChild(r5_cell);
        } else {
            head_cell.classList.add("D");
            document.getElementById(head.id).appendChild(head_cell);

            r2_cell.id = "WeatherTemp" + r24_index.toString();
            document.getElementById(r2c.id).appendChild(r2_cell);

            let r2_temp_box = document.createElement("div");
            r2_temp_box.id = "temp_box" + r24_index.toString();
            r2_temp_box.className = "temp_box";
            document.getElementById(r2_cell.id).appendChild(r2_temp_box);
            
            r4_cell.id = "PoP" + r24_index.toString();
            document.getElementById(r4c.id).appendChild(r4_cell);
            r24_index += 2;

            r3_cell.id = "WeatherTemp" + r3_index.toString();
            document.getElementById(r3c.id).appendChild(r3_cell);
            
            let r3_temp_box = document.createElement("div");
            r3_temp_box.id = "temp_box" + r3_index.toString();
            r3_temp_box.className = "temp_box";
            document.getElementById(r3_cell.id).appendChild(r3_temp_box);
            r3_index += 2;

            r5c.id = "UVI" + i.toString();
            document.getElementById(r5c.id).appendChild(r5_cell);
        }
    }

    city = document.querySelector(".header-search-input").value;
    getWeekdata(url_week, city_dict[city])
})


async function getWeekdata(url, city_code){
    let response = await fetch(url);
    let data = await response.json();
    let city = data.records.locations[0].location[city_code];
    let weatherElements = city.weatherElement;
    console.log(weatherElements);
    let times = weatherElements[9].time;
    const weekdays = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."];
    document.getElementById("city").textContent = city.locationName;
    
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
        
        let dash = document.createElement("span");
        dash.textContent = " - " ;

        let maxT = document.createElement("span");
        maxT.textContent = weatherElements[12].time[i].elementValue[0].value;
        maxT.style.color = "red";

        let degree = document.createElement("span");
        degree.textContent = " °C" ;

        let temp_box = document.getElementById("temp_box" + i.toString());
        if(i % 2 !== 0){
            weather_icon.src = weather_icon_url + "day/" + weather + ".svg";
            temp_box.parentNode.insertBefore(weather_icon, temp_box);
            document.getElementById("temp_box" + i.toString()).appendChild(minT);
            document.getElementById("temp_box" + i.toString()).appendChild(dash);
            document.getElementById("temp_box" + i.toString()).appendChild(maxT);
            document.getElementById("temp_box" + i.toString()).appendChild(degree);
        } else {
            weather_icon.src = weather_icon_url + "night/" + weather + ".svg";
            temp_box.parentNode.insertBefore(weather_icon, temp_box);
            document.getElementById("temp_box" + i.toString()).appendChild(minT);
            document.getElementById("temp_box" + i.toString()).appendChild(dash);
            document.getElementById("temp_box" + i.toString()).appendChild(maxT);
            document.getElementById("temp_box" + i.toString()).appendChild(degree);
            
        }
    }

}

