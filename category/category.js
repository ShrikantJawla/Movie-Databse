/** @format */

api = "api_key=8a88403617c4c982fe33092da09422d0";
baseUrl = "https://api.themoviedb.org/3";
imagUrl = "https://image.tmdb.org/t/p/w500";

let categoriesBtn = document.querySelector(".categoryDiv");

async function getGenre() {
	let res1 = await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?${api}&language=en-US`
	);
	let allGenres = await res1.json();
	let genList = allGenres.genres;
	// console.log(genList);
	displayGenres(genList);
}
getGenre();

//For default display I am calling this fuction :
fetchGenre("action");

function displayGenres(d) {
	categoriesBtn.innerHTML = null;
	d.forEach((ele) => {
		let btn = document.createElement("button");
		btn.classList.add("categoryBtn");
		btn.innerText = ele.name;
		btn.style.cursor = "pointer";
		btn.addEventListener("click", () => {
			let btnArr = document.getElementsByClassName("categoryBtn"); //This is to remove previouslt selectedBtn classes.

			for (let i = 0; i < btnArr.length; i++) {
				btnArr[i].classList.remove("selectedBtn");
			}
			fetchGenre(ele.id);
			btnClickClassToggle(btn);
		});
		categoriesBtn.append(btn);
	});
}

async function fetchGenre(d) {
	let res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?${api}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_genres=${d}`
	);
	let data = await res.json();
	let arr = data.results;
	// console.log(arr);
	displayParticularGenre(arr);
}

function displayParticularGenre(d) {
	// console.log(d);
	let box = document.querySelector(".displayMovies");
	box.innerHTML = null;
	d.forEach((ele) => {
		let div = document.createElement("div");
		div.classList.add("movie");
		div.innerHTML = `<img
					src="${imagUrl + ele.poster_path}"
					alt="${ele.title}"
				/>
				<div class="info">
					<p>${ele.title}</p>
					<p><span class="${rateCol(ele.vote_average)}">${ele.vote_average}</span></p>
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

function selectObj(o) {
	nameMov = o.title;
	localStorage.setItem("name", nameMov);
	if (window.location.href === "./index.html") {
		window.location.href = "./displayPage/display.html";
	} else {
		window.location.href = "../displayPage/display.html";
	}
}

function btnClickClassToggle(btn) {
	btn.classList.toggle("selectedBtn");
}
