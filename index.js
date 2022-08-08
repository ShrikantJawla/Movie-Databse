/** @format */

let nameMov = localStorage.getItem("name") || "";

function createEl(x) {
	return document.createElement(x);
}
function getEl(x) {
	return document.getElementById(x);
}

let id;
function debounce(fn, delay) {
	if (id) {
		clearInterval(id);
	}
	id = setTimeout(function () {
		fn();
	}, delay);
}

async function main() {
	try {
		let nameOfMov = getEl("name");
		let res = await fetch(
			`https://www.omdbapi.com/?apikey=ee681166&s=${nameOfMov.value}`
		);
		let data = await res.json();
		if (data.Search !== undefined) {
			console.log(data.Search);
			appendDataInSeachBox(data.Search);
		} else {
			document.getElementById("box").innerHTML = null;
		}
	} catch (e) {
		console.log(e);
	}
}

function appendDataInSeachBox(res) {
	let box = getEl("box");
	box.innerHTML = null;
	res.forEach((ele) => {
		let div = createEl("div");
		div.setAttribute("class", "searchDivs");
		let poster = createEl("img");
		poster.src = ele.Poster;

		let divText = createEl("div");
		let title = createEl("p");
		title.innerText = ele.Title;
		title.style.color = "brown";

		let year = createEl("p");
		year.innerText = ele.Year;

		let type = createEl("p");
		type.innerText = ele.Type;

		divText.append(title, year, type);
		div.append(poster, divText);
		box.append(div);

		div.style.cursor = "pointer";
		div.addEventListener("click", () => {
			open(ele);
		});
	});
}

function open(ele) {
	nameMov = ele.Title;
	localStorage.setItem("name", nameMov);
	if (window.location.href === "./index.html") {
		window.location.href = "./displayPage/display.html";
	} else {
		window.location.href = "../displayPage/display.html";
	}
}

// function boxFlex() {
// 	let box = getEl("box");
// 	box.classList.add("visible");
// }
function emptyString() {
	let n = document.getElementById("name").value;
	let box = getEl("box");
	if (n !== "") {
			box.classList.add("visible");
	}else{
		box.classList.remove("visible");
	}
}

function boxNone() {
	let box = getEl("box");
	box.classList.remove("visible");
}
function escKey() {
	if (event.key === "Escape") {
		let box = getEl("box");
		box.classList.remove("visible");
	}
}

//First Cruisor----------------------------------------------------------------------------

const api = "api_key=8a88403617c4c982fe33092da09422d0";
const baseUrl = "https://api.themoviedb.org/3";
const imagUrl = "https://image.tmdb.org/t/p/w500";
let data1;
async function main1() {
	try {
		let res = await fetch(
			`${baseUrl}/discover/movie?primary_release_date.gte=2022-01-01&primary_release_date.lte=2022-07-22&${api}`
		);
		data1 = await res.json();
		if (data1.results !== undefined) {
			append2(data1.results);
		}
		// console.log(data1.results);
	} catch (e) {
		console.log(e);
	}
}

main1();

function append2(data) {
	let box = getEl("fCruisor");
	box.innerHTML = null;

	data.forEach((ele) => {
		let div = createEl("div");
		div.classList.add("movie");

		div.innerHTML = `<img src="${imagUrl + ele.poster_path}" alt="${
			ele.title
		}" />
                <div class="info">
                    <h3>${ele.title}</h3>
                    <p><span class="${rateCol(ele.vote_average)}">${
			ele.vote_average
		}</span></p>
                </div>
				<div class="des"><span style="color:red; font-weight:bold;">Overview: </span> <br/>
					${ele.overview}
				</div>`;
		div.style.cursor = "pointer";
		div.addEventListener("click", () => {
			selectObj(ele);
		});

		box.append(div);
	});
}

function rateCol(el) {
	if (+el <= 3) return "red";
	else if (+el > 3 && +el <= 7) return "orange";
	else return "green";
}

function selectObj(o) {
	nameMov = o.title;
	localStorage.setItem("name", nameMov);
	if (window.location.href === "./index.html") {
		window.location.href = "./displayPage/display.html";
	} else {
		window.location.href = "../displayPage/display.html";
	}
}

//Third Cruisor-----------------------------------------------------------------------------------------------------

async function main2() {
	try {
		let res = await fetch(
			`${baseUrl}/discover/movie?with_genres=18&primary_release_year=2022c&${api}`
		);
		let data = await res.json();
		if (data.results !== undefined) {
			append3(data.results);
		}
		// console.log(data.results);
	} catch (e) {
		console.log(e);
	}
}

main2();

function append3(data) {
	let box = getEl("sCruisor");
	box.innerHTML = null;

	data.forEach((ele) => {
		let div = createEl("div");
		div.classList.add("movie");

		div.innerHTML = `<img src="${imagUrl + ele.poster_path}" alt="${
			ele.title
		}" />
                <div class="info">
                    <h3>${ele.title}</h3>
                    <p><span class="${rateCol(ele.vote_average)}">${
			ele.vote_average
		}</span></p>
                </div>
				<div class="des"><span style="color:red; font-weight:bold;">Overview: </span> <br/>
					${ele.overview}
				</div>`;
		div.style.cursor = "pointer";
		div.addEventListener("click", () => {
			selectObj(ele);
		});

		box.append(div);
	});
}
