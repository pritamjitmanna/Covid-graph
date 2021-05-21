let cases = document.getElementById('case');
let death = document.getElementById('death');
let recover = document.getElementById('recover');
let graph = document.getElementById('graph');
let Info = document.getElementById('Info');
cases.innerHTML = "";
death.innerHTML = "";
recover.innerHTML = "";
let path = "https://api.covid19india.org/data.json";
let ratiocase = 500000 / 200;
let ratiodeath = 5000 / 200;
let ratiorecover = 500000 / 200;
let valuecase = document.querySelectorAll('#value #valcase div');
let linecase = document.querySelectorAll('#line #linecase hr');
let valuedeath = document.querySelectorAll('#value #valdeath div');
let linedeath = document.querySelectorAll('#line #linedeath hr');
let valuerecover = document.querySelectorAll('#value #valrecover div');
let linerecover = document.querySelectorAll('#line #linerecover hr');
let lineval = 100000;
let html = "", daily;



// Adding the line
function addlineval() {
    for (val of valuecase) val.style.height = `${100000 / ratiocase}px`;
    for (lin of linecase) { lin.style.bottom = `${lineval / ratiocase}px`; lineval += 100000; }
    lineval = 1000;
    for (val of valuedeath) val.style.height = `${1000 / ratiodeath}px`;
    for (lin of linedeath) { lin.style.bottom = `${lineval / ratiodeath}px`; lineval += 1000; }
    lineval = 100000;
    for (val of valuerecover) val.style.height = `${100000 / ratiorecover}px`;
    for (lin of linerecover) { lin.style.bottom = `${lineval / ratiorecover}px`; lineval += 100000; }
}

addlineval();

// Fetching the value
fetch(path).then(res => res.json()).then(data => {
    daily = data.cases_time_series;
    console.log(data);
    Array.from(daily).forEach(element => {

        //Adding the bar to the graph
        addcase(element);
        adddeath(element);
        addrecoveries(element);

    });
    cases.style.gridTemplateColumns = `repeat(${daily.length + 10},1fr)`;
    death.style.gridTemplateColumns = `repeat(${daily.length + 10},1fr)`;
    recover.style.gridTemplateColumns = `repeat(${daily.length + 10},1fr)`;
    let all = document.getElementsByClassName('all');

    // To show cases on hover
    for (all of all) {
        all.addEventListener('mouseover', e => {
            let date = e.target.getAttribute('id');
            //   console.log(date);
            document.querySelector(`div[data-name="${date}"`).style.visibility = 'visible';
        });
        all.addEventListener('mouseleave', e => {
            let date = e.target.getAttribute('id');
            //   console.log(date);
            document.querySelector(`div[data-name="${date}"`).style.visibility = 'hidden';
        });
    }

});


// Hiding and showing the respective graph box ,line box and info box for cases, deaths, recoveries etc
function hideshow(hid1,hid2,vis1,hid3,hid4,vis2,none1,none2,bl){
    hid1.style.visibility = 'hidden';
    hid2.style.visibility = 'hidden';
    hid3.style.visibility = 'hidden';
    hid4.style.visibility = 'hidden';
    vis1.style.visibility = 'visible';
    vis2.style.visibility = 'visible';
    for (inf of bl) inf.style.display = 'block';
    for (inf of none1) inf.style.display = 'none';
    for (inf of none2) inf.style.display = 'none';
}

// Changing the graph values
function type_change() {
    let type = document.querySelector('select[name="type"]').value;
    if (type === 'case')hideshow(death,recover,cases,document.getElementById('valdeath'),document.getElementById('valrecover'),document.getElementById('valcase'),document.getElementsByClassName('infodeath'),document.getElementsByClassName('inforecover'),document.getElementsByClassName('infocase'));
    else if (type === 'recover')hideshow(death,cases,recover,document.getElementById('valdeath'),document.getElementById('valcase'),document.getElementById('valrecover'),document.getElementsByClassName('infodeath'),document.getElementsByClassName('infocase'),document.getElementsByClassName('inforecover'));
    else hideshow(cases,recover,death,document.getElementById('valcase'),document.getElementById('valrecover'),document.getElementById('valdeath'),document.getElementsByClassName('infocase'),document.getElementsByClassName('inforecover'),document.getElementsByClassName('infodeath'));
}

// Adding the bar graph for new cases
function addcase(element) {
    let newel = document.createElement('div');
    valueit(element);
    newel.classList.add('case', 'all');
    newel.setAttribute('id', `${element.dateymd}`)
    newel.style.height = `${element.dailyconfirmed / ratiocase}px`;
    // newel.style.left=`${lineval}px`;
    cases.appendChild(newel);
}



// Adding the bar graph for death
function adddeath(element) {
    let newde = document.createElement('div');
    newde.classList.add('death', 'all');
    newde.setAttribute('id', `${element.dateymd}`)
    newde.style.height = `${element.dailydeceased / ratiodeath}px`;
    // newde.style.left=`${lineval}px`;
    death.appendChild(newde);
}


// Adding the bar graph for recoveries
function addrecoveries(element) {
    let newre = document.createElement('div');
    newre.classList.add('recover', 'all');
    newre.setAttribute('id', `${element.dateymd}`)
    newre.style.height = `${element.dailyrecovered / ratiorecover}px`;
    // newre.style.left=`${lineval}px`;
    recover.appendChild(newre);
}

// Inserting the value to be shown on hover
function valueit(element) {
    Info.innerHTML += `<div class="info" data-name="${element.dateymd}">
                <div>
                    <label for="date">Date</label>
                    <div name="date">${element.dateymd}</div>
                </div>
                <div class="infocase">
                    <label for="cases">New Cases</label>
                    <div name="cases">${element.dailyconfirmed}</div>
                </div>
                <div class="infodeath">
                    <label for="cases">Deaths</label>
                    <div name="cases">${element.dailydeceased}</div>
                </div>
                <div class="inforecover">
                    <label for="cases">Recoveries</label>
                    <div name="cases">${element.dailyrecovered}</div>
                </div>
                
            </div>`;
}