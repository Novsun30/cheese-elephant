// 36小時 Home Page
const today = new Date();
const hours = today.getHours();

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

  search: function () {
    this.fetchWeather(document.querySelector('.header-search-input').value);
    document.querySelector('.city').innerText = document.querySelector(
      '.header-search-input'
    ).value;
  },
};

document
  .querySelector('.header-search-btn')
  .addEventListener('click', function () {
    weather.search();
  });

const areas = document.querySelectorAll('.area');

areas.forEach((area) => {
  area.addEventListener('click', () => {
    const title = area.title;
    // 將 title 傳遞給其他函數
    weather.fetchWeather(title);
    document.querySelector('.city').innerText = title;
  });
});

weather.fetchWeather('臺北市');

const dateString = today.toLocaleDateString();
document.querySelector('.dateis').innerText = dateString;

const paths = document.querySelectorAll('path');

paths.forEach((path) => {
  path.addEventListener('mouseover', function () {
    weather.fetchWeather(this.getAttribute('data-name-zh'));
    document.querySelector('.city').innerText =
      this.getAttribute('data-name-zh');
  });
});
