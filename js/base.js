// Header,Nav and Footer

const area = {
    "North": ['臺北市', '新北市', '基隆市', '新竹市', '桃園市', '新竹縣', '宜蘭縣'],
    "West": ['臺中市', '苗栗縣', '彰化縣', '南投縣', '雲林縣'],
    "South": ['臺南市', '高雄市', '嘉義市', '嘉義縣', '屏東縣', '澎湖縣'],
    "East": ['臺東縣', '花蓮縣', '金門縣', '連江縣']
}

// 輸入框的地區列表
const headerSearchList = document.getElementById("header-search-list");
const headerSearchInput = document.getElementsByClassName("header-search-input")[0];

function showList() {
    headerSearchList.classList.remove("hide");
}
function hideList() {
    headerSearchList.classList.add("hide");
}

window.addEventListener('click', function (e) {
    if (e.target == headerSearchList) {
        showList();
    } else if (e.target == headerSearchInput) {
        showList();
    } else {
        hideList();
    }
}, true);

function printArea(areaName) {
    headerSearchInput.value = areaName.innerHTML;
    hideList();
}

function showAreaList(areaList) {
    for (const [key] of Object.entries(areaList)) {
        const ul = document.createElement("ul");
        headerSearchList.appendChild(ul);
        areaList[key].forEach(function (value) {
            const content = `
                <li onclick="printArea(this)">${value}</li>
            `
            ul.insertAdjacentHTML('beforeend', content);
        });
    }
}

showAreaList(area);

// 輸入框搜尋篩選
function detectInput(value) {
    if (value == '') {
        headerSearchList.innerHTML = '';
        showAreaList(area);
        return;
    }

    const keyword = value.trim().toLowerCase();
    let newAreaList = {
        "North": [],
        "West": [],
        "South": [],
        "East": [],
        "outlying": []
    };

    for (const [key] of Object.entries(area)) {
        area[key].filter(function (areas) {
            const localArea = areas.toLowerCase().match(keyword);
            if (localArea != null) {
                newAreaList[key].push(localArea['input']);
            }
        })
    }
    headerSearchList.innerHTML = '';
    showAreaList(newAreaList);
}

// 回頂部的按鈕
window.onscroll = onScrolling;

function onScrolling() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("top-btn").style.display = "block";
    } else {
        document.getElementById("top-btn").style.display = "none";
    }
}

function toTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}