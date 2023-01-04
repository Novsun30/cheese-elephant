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
    // let row1 = document.createElement("tr");
    // row1.id = "row1"
    // let row2 = document.createElement("tr");
    // row2.id = "row2"
    // let row3 = document.createElement("tr");
    // row3.id = "row3"
    // let row4 = document.createElement("tr");
    // row4.id = "row4"
    // let row5 = document.createElement("tr");
    // row5.id = "row5"
    
    // document.getElementById(table.id).appendChild(row2);
    // document.getElementById(table.id).appendChild(row3);
    // document.getElementById(table.id).appendChild(row4);
    // document.getElementById(table.id).appendChild(row5);

    // row_data
    let r24_index = 1;
    let r3_index = 2;
    for(let i=0; i<8; i++){
        let head = document.createElement("th");
        let r2c = document.createElement("td");
        let r3c = document.createElement("td");
        let r4c = document.createElement("td");
        let r5c = document.createElement("td");
        if(i == 0){
            head.id = "city";
            document.getElementById(row1.id).appendChild(head);

            r2c.textContent = "白天";
            document.getElementById(row2.id).appendChild(r2c);

            r3c.textContent = "晚上";
            document.getElementById(row3.id).appendChild(r3c);

            r4c.textContent = "降雨機率";
            document.getElementById(row4.id).appendChild(r4c);
            
            r5c.textContent = "紫外線";
            document.getElementById(row5.id).appendChild(r5c);
        } else {
            head.className = "D"
            document.getElementById(row1.id).appendChild(head);

            r2c.id = "WeatherTemp" + r24_index.toString();
            document.getElementById(row2.id).appendChild(r2c);

            let r2_temp_box = document.createElement("div");
            r2_temp_box.id = "temp_box" + r24_index.toString();
            r2_temp_box.className = "temp_box";
            document.getElementById(r2c.id).appendChild(r2_temp_box);
            
            r4c.id = "PoP" + r24_index.toString();
            document.getElementById(row4.id).appendChild(r4c);
            r24_index += 2;

            r3c.id = "WeatherTemp" + r3_index.toString();
            document.getElementById(row3.id).appendChild(r3c);
            
            let r3_temp_box = document.createElement("div");
            r3_temp_box.id = "temp_box" + r3_index.toString();
            r3_temp_box.className = "temp_box";
            document.getElementById(r3c.id).appendChild(r3_temp_box);
            r3_index += 2;

            r5c.id = "UVI" + i.toString();
            document.getElementById(row5.id).appendChild(r5c);
        }
    }
    // let head1 = document.createElement("th");
    // head1.id = "city";
    // let head2 = document.createElement("th");
    // head2.className = "D";
    // let head3 = document.createElement("th");
    // head3.className = "D";
    // let head4 = document.createElement("th");
    // head4.className = "D";
    // let head5 = document.createElement("th");
    // head5.className = "D";
    // let head6 = document.createElement("th");
    // head6.className = "D";
    // let head7 = document.createElement("th");
    // head7.className = "D";
    // let head8 = document.createElement("th");
    // head8.className = "D";
    
    // document.getElementById(row1.id).appendChild(head2);
    // document.getElementById(row1.id).appendChild(head3);
    // document.getElementById(row1.id).appendChild(head4);
    // document.getElementById(row1.id).appendChild(head5);
    // document.getElementById(row1.id).appendChild(head6);
    // document.getElementById(row1.id).appendChild(head7);
    // document.getElementById(row1.id).appendChild(head8);

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

