// 36小時 Home Page
const today = new Date();
const hours = today.getHours();

const cPosition = {
  臺北市: '288 30',
  新北市: '280 65',
  桃園市: '240 55',
  新竹縣: '235 95',
  新竹市: '210 80',
  苗栗縣: '210 130',
  臺中市: '180 170',
  彰化縣: '150 210',
  雲林縣: '130 235',
  嘉義縣: '170 265',
  嘉義市: '142 265',
  臺南市: '130 320',
  高雄市: '130 380',
  屏東縣: '170 420',
  臺東縣: '225 350',
  花蓮縣: '275 220',
  南投縣: '220 200',
  宜蘭縣: '300 115',
  基隆市: '310 30',
  澎湖縣: '15 250',
  金門縣: '20 150',
  連江縣: '20 80',
};

/* ------------------get weather api------------------------- */
let weather = {
  apikey: 'CWB-76F302B7-FD21-4D85-BB7B-73FA0BEDBC2B',

  fetchWeather: function (city) {
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${this.apikey}&locationName=${city}&format=JSON`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    let todaywx =
      data.records.location[0].weatherElement[0].time[0].parameter
        .parameterValue;
    if (todaywx < 10) {
      todaywx = '0' + todaywx;
    }

    let tonightwx =
      data.records.location[0].weatherElement[0].time[1].parameter
        .parameterValue;
    if (tonightwx < 10) {
      tonightwx = '0' + tonightwx;
    }

    let tomowx =
      data.records.location[0].weatherElement[0].time[2].parameter
        .parameterValue;
    if (tomowx < 10) {
      tomowx = '0' + tomowx;
    }

    const todayPic = document.querySelector('.today-pic');
    const tonightPic = document.querySelector('.tonight-pic');
    const tomoPic = document.querySelector('.tomo-pic');

    if (hours < 6) {
      document.querySelector('.today-title').innerText = '今日凌晨';
      document.querySelector('.today-time').innerText = '00:00~06:00';
      document.querySelector('.tonight-title').innerText = '今日白天';
      document.querySelector('.tonight-time').innerText = '06:00~18:00';
      document.querySelector('.tomo-title').innerText = '今日晚上';
      document.querySelector('.tomo-time').innerText = '18:00-06:00';

      todayPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/${todaywx}.svg`;

      tonightPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${tonightwx}.svg`;

      tomoPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/${tomowx}.svg`;
    } else if (hours < 12) {
      document.querySelector('.today-title').innerText = '今日白天';
      document.querySelector('.today-time').innerText = '6:00~18:00';
      document.querySelector('.tonight-title').innerText = '今晚明晨';
      document.querySelector('.tonight-time').innerText = '18:00~06:00';
      document.querySelector('.tomo-title').innerText = '明日白天';
      document.querySelector('.tomo-time').innerText = '06:00-18:00';

      todayPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${todaywx}.svg`;

      tonightPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/${tonightwx}.svg`;

      tomoPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${tomowx}.svg`;
    } else if (hours < 18) {
      document.querySelector('.today-title').innerText = '今日白天';
      document.querySelector('.today-time').innerText = '12:00~18:00';
      document.querySelector('.tonight-title').innerText = '今晚明晨';
      document.querySelector('.tonight-time').innerText = '18:00~06:00';
      document.querySelector('.tomo-title').innerText = '明日白天';
      document.querySelector('.tomo-time').innerText = '06:00-18:00';

      todayPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${todaywx}.svg`;

      tonightPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/${tonightwx}.svg`;

      tomoPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${tomowx}.svg`;
    } else if (hours < 24) {
      document.querySelector('.today-title').innerText = '今晚明晨';
      document.querySelector('.today-time').innerText = '18:00~06:00';
      document.querySelector('.tonight-title').innerText = '明日白天';
      document.querySelector('.tonight-time').innerText = '06:00~18:00';
      document.querySelector('.tomo-title').innerText = '明日晚上';
      document.querySelector('.tomo-time').innerText = '18:00-06:00';

      todayPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/${todaywx}.svg`;

      tonightPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${tonightwx}.svg`;

      tomoPic.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/${tomowx}.svg`;
    }

    const todaypop =
      data.records.location[0].weatherElement[1].time[0].parameter
        .parameterName;
    document.querySelector('.today-pop').innerText = todaypop;

    const tonightpop =
      data.records.location[0].weatherElement[1].time[1].parameter
        .parameterName;

    document.querySelector('.tonight-pop').innerText = tonightpop;

    const tomopop =
      data.records.location[0].weatherElement[1].time[2].parameter
        .parameterName;

    document.querySelector('.tomo-pop').innerText = tomopop;

    const todaymintemp =
      data.records.location[0].weatherElement[2].time[0].parameter
        .parameterName;
    document.querySelector('.today-min-temp').innerText = todaymintemp + '°c -';

    const tonightmintemp =
      data.records.location[0].weatherElement[2].time[1].parameter
        .parameterName;
    document.querySelector('.tonight-min-temp').innerText =
      tonightmintemp + '°c -';

    const tomomintemp =
      data.records.location[0].weatherElement[2].time[2].parameter
        .parameterName;
    document.querySelector('.tomo-min-temp').innerText = tomomintemp + '°c -';

    const todaymaxtemp =
      data.records.location[0].weatherElement[4].time[0].parameter
        .parameterName;
    document.querySelector('.today-max-temp').innerText = todaymaxtemp + '°c';

    const tonightmaxtemp =
      data.records.location[0].weatherElement[4].time[1].parameter
        .parameterName;
    document.querySelector('.tonight-max-temp').innerText =
      tonightmaxtemp + '°c';

    const tomomaxtemp =
      data.records.location[0].weatherElement[4].time[2].parameter
        .parameterName;
    document.querySelector('.tomo-max-temp').innerText = tomomaxtemp + '°c';
  },
  // search bar
  search: function () {
    this.fetchWeather(document.querySelector('.header-search-input').value);
    const cityValue = document.querySelector('.header-search-input').value;
    document.querySelector('.city').innerText = cityValue;

    document
      .getElementById('position')
      .setAttribute('transform', `translate(${cPosition[cityValue]})`);
  },
};

// click search bar
document
  .querySelector('.header-search-btn')
  .addEventListener('click', function () {
    weather.search();
  });

// 每日時間顯示
const dateString = today.toLocaleDateString();
const regex = /^(\d+).(\d+).(\d+)/;
const [, year, month, day] = dateString.match(regex);

document.querySelector('.dateis').innerText = `${month}/${day}`;

// 座標城市定位
const gPosition = {
  C63: '288 30',
  C65: '280 65',
  C68: '240 55',
  C10004: '235 95',
  C10018: '210 80',
  C10005: '210 130',
  C66: '180 170',
  C10007: '150 210',
  C10009: '130 235',
  C10010: '170 265',
  C10020: '142 265',
  C67: '130 320',
  C64: '130 380',
  C10013: '170 420',
  C10014: '225 350',
  C10015: '275 220',
  C10008: '220 200',
  C10002: '300 115',
  C10017: '310 30',
  C10016: '15 250',
  C09020: '20 150',
  C09007: '20 80',
};

// 移動座標定位
const gArea = document.querySelectorAll('g');

gArea.forEach((g) => {
  g.addEventListener('click', function () {
    const value = gPosition[this.getAttribute('id')];
    document
      .getElementById('position')
      .setAttribute('transform', `translate(${value})`);
  });
});

// click map area

const paths = document.querySelectorAll('path');

paths.forEach((path) => {
  path.addEventListener('click', function () {
    weather.fetchWeather(this.getAttribute('data-name-zh'));
    document.querySelector('.city').innerText =
      this.getAttribute('data-name-zh');
  });
});

// 城市左右箭頭

let indexValue = 0;
function sideSlide(e) {
  showCity((indexValue += e));
}

function showCity(e) {
  const cityList = [
    '臺北市',
    '新北市',
    '桃園市',
    '新竹市',
    '新竹縣',
    '苗栗縣',
    '臺中市',
    '彰化縣',
    '南投縣',
    '雲林縣',
    '嘉義市',
    '嘉義縣',
    '臺南市',
    '高雄市',
    '屏東縣',
    '宜蘭縣',
    '花蓮縣',
    '臺東縣',
    '澎湖縣',
    '金門縣',
    '連江縣',
    '基隆市',
  ];

  if (e > cityList.length - 1) {
    indexValue = 0;
  }
  if (e < 0) {
    indexValue = cityList.length - 1;
  }
  weather.fetchWeather(cityList[indexValue]);
  document.querySelector('.city').innerText = cityList[indexValue];

  document
    .getElementById('position')
    .setAttribute('transform', `translate(${cPosition[cityList[indexValue]]})`);
}

// 圈圈天氣顯示
const circles = document.querySelectorAll('.icon');

circles.forEach((circle) => {
  circle.addEventListener('click', function () {
    weather.fetchWeather(this.getAttribute('data'));
    document.querySelector('.city').innerText = this.getAttribute('data');

    const value1 = gPosition[this.getAttribute('id')];
    document
      .getElementById('position')
      .setAttribute('transform', `translate(${value1})`);
  });
});

//首頁fetch
weather.fetchWeather('臺北市');

/* --------------首頁全台灣圈圈氣候fetch api------------------- */
let picture = {
  apikey: 'CWB-76F302B7-FD21-4D85-BB7B-73FA0BEDBC2B',

  fetchWeather: function () {
    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${this.apikey}&format=JSON`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    let parameterArray = data.records.location;
    let valueArray = parameterArray.map(
      (item) => item.weatherElement[0].time[0].parameter.parameterValue
    );
    let newValueArray = valueArray.map((item) =>
      item < 10 ? (item = '0' + item) : item
    );

    const order = [
      6, 2, 14, 4, 5, 9, 12, 21, 10, 1, 3, 7, 16, 18, 13, 11, 15, 8, 19, 20, 17,
      22,
    ];
    const newArray = order.map((index) => newValueArray[index - 1]);

    circles.forEach((circle, index) => {
      if (hours < 6) {
        circle.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/${newArray[index]}.svg`;
      } else if (hours < 18) {
        circle.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/${newArray[index]}.svg`;
      } else if (hours < 24) {
        circle.src = `https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/night/${newArray[index]}.svg`;
      }
    });
  },
};

//抓全台圈圈圖示
picture.fetchWeather();
