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
		title.style.cursor = "pointer";
		title.addEventListener("click", () => {
			open(ele);
		});

		let year = createEl("p");
		year.innerText = ele.Year;

		let type = createEl("p");
		type.innerText = ele.Type;

		divText.append(title, year, type);
		div.append(poster, divText);
		box.append(div);
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

function boxFlex() {
	let box = getEl("box");
	box.classList.add("visible");
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
