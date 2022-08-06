/** @format */

function createEl(x) {
	return document.createElement(x);
}
function getEl(x) {
	return document.getElementById(x);
}

let nameOfMov = localStorage.getItem("name");

let data;
async function main() {
	try {
		let res = await fetch(
			`https://www.omdbapi.com/?apikey=ee681166&t=${nameOfMov}`
		);
		data = await res.json();
		console.log(data);
		display(data);
	} catch (e) {
		console.log(e);
	}
}
main();

function display(d) {
	let box = getEl("posterContent");
	box.innerHTML = null;
	document.getElementById("backImg").src = data.Poster;

	let img = createEl("img");
	img.src = d.Poster;

	let textdiv = createEl("div");

	let nameDiv = createEl("div");
	let name = createEl("p");
	name.innerText = d.Title;
	let year = createEl("p");
	year.innerText = "(" + d.Year + ")";
	nameDiv.append(name, year);

	let relDiv = createEl("div");
	let rel = createEl("p");
	rel.innerText = d.Released + " |";

	let genre = createEl("p");
	genre.innerText = d.Genre + " |";
	let runtime = createEl("p");
	runtime.innerText = d.Runtime + " |";

	let rating = createEl("p");
	rating.innerText = "IMDb: " + d.imdbRating;
	relDiv.append(rel, genre, runtime, rating);

	let overviewDiv = createEl("div");
	let ovev = createEl("p");
	ovev.innerText = "Overview- " + d.Plot;
	overviewDiv.append(ovev);

	let finalDiv = createEl("div");

	let dirDiv = createEl("div");
	let director = createEl("p");
	director.innerText = d.Director;
	let key = createEl("p");
	key.innerText = "Director,Writer";
	dirDiv.append(director, key);

	let WriterDiv = createEl("div");
	let writer = createEl("p");
	writer.innerText = d.Writer;
	let wKey = createEl("p");
	wKey.innerText = "Writer";
	WriterDiv.append(writer, wKey);

	let langDiv = createEl("div");
	let lang = createEl("p");
	lang.innerText = d.Language;
	let lkey = createEl("p");
	lkey.innerText = "lang,Writer";
	langDiv.append(lang, lkey);

	finalDiv.append(dirDiv, WriterDiv, langDiv);
	textdiv.append(nameDiv, relDiv, overviewDiv, finalDiv);

	box.append(img, textdiv);

	//OtherInfo Div is from here:

	let box2 = getEl("otherInfo");
	box2.innerHTML = null;

	let div1 = createEl("div");
	let act = createEl("p");
	act.innerText = "Actors: " + d.Actors;

	let country = createEl("p");
	country.innerText = d.Country;

	div1.append(act, country);

	let awardDiv = createEl("div");
	let awad = createEl("p");
	awad.innerText = "Awards: " + d.Awards;
	awardDiv.append(awad);

	let otrRatingDiv = createEl("div");
	let rat1 = createEl("p");
	rat1.innerText = `Source- ${d.Ratings[0].Source} | Value- ${d.Ratings[0].Value}`;
	let rat2 = createEl("p");
	rat2.innerText = `Source- ${d.Ratings[1].Source} | Value- ${d.Ratings[1].Value}`;
	otrRatingDiv.append(rat1, rat2);

	let boxOffDiv = createEl("div");
	let boxOff = createEl("p");
	boxOff.innerText = `BoxOffice- ${d.BoxOffice}`;
	boxOffDiv.append(boxOff);

	box2.append(div1, awardDiv, otrRatingDiv, boxOffDiv);
}
