/* Wykorzystując API Ricky i Morty, napisz prostą stronę składającą się z
dwóch podstron. Na pierwszej głównej stronie wyświetl postacie i zastosuj paginację. Stwórz też na tej stronie.
search który będzie filtrował te postacie po nazwie i po zatwierdzeniu Enterem pokazywał
nową listę postaci.
Każdy kafelek z postacią powinien zawierać dane takie jak: name, image, species.
W przypadku braku grafiki wyświetlić dowolny placeholder.
Druga strona będzie uruchamiana po kliku w kafelek z postacią, ma przedstawiać
bardziej szczegółowe dane postaci wraz z listą odcinków w jakich brała udział (lista ma zawierać numer oraz nazwę odcinka).
 Dodać dane do postaci takie jak: gender, location name, status oraz listę odcinków. Druga strona powinna zawierać strzałkę powrotu do pierwszej strony.
Do warstwy wizualnej dowolne wykorzystanie sposobu stylowania, mile będzie widziane wykorzystanie metodologii BEM i zadbanie o czytelność strony. Ważne aby strona była RWD.
Link do dokumentacji API:
graphql: https://rickandmortyapi.com/documentation/#graphql
REST: https://rickandmortyapi.com/documentation/#rest
 */

async function setCharacterList(responseJson) {
    if (Object.keys(responseJson).find(c => c === "error")) {
        console.log('error, ' + responseJson.error);
    }
    else if (!Object.keys(responseJson).find(c => c === "results")){
        console.log("something went wrong");
    }
    else {
        displayCharacters(responseJson.results);
        setNavButtons(responseJson.info);
    }
}

function setNavButtons(info) {
    let prev = document.getElementById("previous");
    if(!info.prev){
        prev.onclick = () => {};
        prev.setAttribute("class", "nav-button__inactive")
    } else {
        prev.onclick = async () => {
            setCharacterList(await getCharactersPage(info.prev));
        }
        prev.setAttribute("class", "nav-button__active")
    }
    let next = document.getElementById("next");
    if(!info.next){
        next.onclick = () => {}
        next.setAttribute("class", "nav-button__inactive")
    } else {
        next.onclick = async () => {
            setCharacterList(await getCharactersPage(info.next));
        }
        next.setAttribute("class", "nav-button__active")

    }
}

/* Każdy kafelek z postacią powinien zawierać dane takie jak: name, image, species.
W przypadku braku grafiki wyświetlić dowolny placeholder. */

function displayCharacters(charLi) {
    let charContainer = document.getElementById('character-list');
    charContainer.innerHTML = "";
    console.log(charLi);
    for(let ch of charLi){
        let tile = document.createElement("div");
        tile.setAttribute("class", "character-tile");

        let tileName = document.createElement("p");
        tileName.setAttribute("class", "character-tile__name");
        tileName.textContent = ch.name;

        let tileSpecies = document.createElement("p");
        tileSpecies.setAttribute("class", "character-tile__species");
        tileSpecies.textContent = ch.species;

        let tileImage = document.createElement("img");
        tileImage.setAttribute("class", "character-tile__image");
        tileImage.setAttribute("src", ch.image);

        let link = document.createElement("a");
        link.setAttribute("href", "character.html?id="+ch.id);

        link.appendChild(tile);

        tile.append(tileImage, tileName, tileSpecies);

        charContainer.appendChild(link);
    }
}

async function getCharactersPage(page = null) {
    let characters = null;
    if (!page) {
        let response = await fetch("https://rickandmortyapi.com/api/character");
        characters = await response.json();
    }
    else {
        let response = await (fetch(page));
        characters = await response.json();
    }

    return characters;
}

async function findCharacters(name) {
    let response = await (fetch("https://rickandmortyapi.com/api/character/?name=" + name));
    let characters = await response.json();

    return characters;
}