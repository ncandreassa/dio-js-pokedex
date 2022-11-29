let pokemon = new Pokemon()

const contentContainer = document.getElementById("content-type")

const pokemonName = document.getElementById("name")
const pokemonNumber = document.getElementById("number")
const pokemonTypes = document.getElementById("types")
const pokemonImage = document.getElementById("image")

const pokemonSpecies = document.getElementById("about-detail-species")
const pokemonHeight = document.getElementById("about-detail-height")
const pokemonWeight = document.getElementById("about-detail-weight")
const pokemonAbilities = document.getElementById("about-detail-abilities")

const pokemonHabitat = document.getElementById("generic-detail-habitat")
const pokemonEggGroups = document.getElementById("generic-detail-egg-group")
const pokemonShape = document.getElementById("generic-detail-shape")

function getPokemon() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);


    pokeApi.getPokemonByName(urlParams.get("nome"))
        .then((response) => {
            setPageData(response)
        })
}

function setPageData(response) {
    contentContainer.classList.add(response.type)
    pokemonName.innerHTML = response.name
    pokemonNumber.innerHTML = `#${response.number}`
    pokemonTypes.innerHTML = response.types.map((type => {
        return `
            <span class="type ${type.type.name}">${type.type.name}</span>
        `
    })).join("")
    pokemonImage.src = response.photo

    pokemonHeight.innerHTML = `${fixHeightUnit(response.height)}cm`
    pokemonWeight.innerHTML = `${convertLbstoKg(response.weight)}kg`
    pokemonAbilities.innerHTML = transformAbilities(response.abilities)

    pokeApi.getSpeciesHabitat(response.species.url).then((response => {
        pokemonHabitat.innerHTML = response.habitat.name
        pokemonSpecies.innerHTML = response.color.name
        pokemonEggGroups.innerHTML = response.egg_groups[0].name
        pokemonShape.innerHTML = response.shape.name
    }))
}

function transformAbilities(abilities) {
    const abilitiesList = abilities.map((obj => {
        return obj.ability.name.replaceAll("-", " ")
    }))

    return abilitiesList.join(", ")
}

function backHome() {
    window.history.back()
}

function fixHeightUnit(heightUnit) {
    return heightUnit * 10
}

function convertLbstoKg (weight) {
    return weight / 10
}