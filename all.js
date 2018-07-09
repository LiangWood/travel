
// 接收Api
let data =[];

fetch('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', {})
  .then((response) => {
    // console.log(response);
    return response.json();
  }).then((jsonData) => {
    // console.log(jsonData);
    data = jsonData.result.records;
    selectPrint();
    dataBasic();
  }).catch((err) => {
    console.log('錯誤:', err);
  });


// 宣告標題
const zoneTitle = document.querySelector('.zoneTitle');
// 宣告搜尋列
const select = document.getElementById('selectValue');
// 宣告及監聽點擊button地區
const btnZone = document.getElementById('btnZone');
btnZone.addEventListener('click', buttonChange, false);

// 監聽搜尋列
select.addEventListener('change', selectchange, false);

// 初始化
function dataBasic() {
  let currentData = calloutlocation('苓雅區');
  regionData(currentData);
  zoneTitle.textContent = '苓雅區';
  // console.log(currentData);
}

function selectPrint() {

  // 過濾成乾淨的區域陣列到 areaList
  let areaList = [];
  for (let i = 0; data.length > i; i++) {
    areaList.push(data[i].Zone);
      // console.log(data[i].Zone);
  }

  // 再用 foreach 去判斷陣列裡面所有值是否有吻合
  let area = [];
  areaList.forEach(function (value) {
    if (area.indexOf(value) == -1) {
      area.push(value);
    }
  });

  // 印出DOM元素
  area.forEach(area => {
    select.innerHTML += `<option value="${area}">${area}</option>`
  });

}


// button熱門地區變化
function buttonChange(e){
  if(e.target.nodeName !== 'LI'){return};
  // console.log(e.target.textContent);
  let string = e.target.textContent;
  let currentData = calloutlocation(string);
  regionData(currentData);
  zoneTitle.textContent = string;
}

// 選單點擊地區變化
function selectchange(e) {
  let string = e.target.value;
  let currentdata = calloutlocation(string);
  regionData(currentdata);
  zoneTitle.textContent = string;
}

// 從 data 裡面去找尋地區跟 data.zone 相同的資料並回傳
function calloutlocation(string) {
  const currentData = data.filter(data => string == data.Zone);
  // console.log(currentData);
  return currentData;
}

// 將資料印出在HTML上
function regionData(data) {
  document.getElementById('regionList').innerHTML = " ";
  // console.log(data);
  data.forEach(data => {
    // console.log(`${data.Name},${data.Zone},${data.Opentime},${data.Add},${data.Tel}`);
    document.getElementById('regionList').innerHTML +=
      `
    <div class="main-block">
        <div class="main-img">
          <div class="main-bg bg-cover d-flex justify-content-start align-items-end p-3" style="background-image:url(${data.Picture1});">
            <div class="name">${data.Name}</div>
            <div class="zone ml-auto">${data.Zone}</div>
          </div>
        </div>
        <div class="main-info">
          <div><img src="img/icons_clock.png" alt="">${data.Opentime}</div>
          <div><img src="img/icons_pin.png" alt="">${data.Add}</div>
          <div class="clearfix">
            <div class="phone"><img src="img/icons_phone.png" alt="">${data.Tel}</div>
            <div class="tag"><img src="img/icons_tag.png" alt="">${data.Ticketinfo}</div>
          </div>
        </div>
    </div>
    `
  });
}
