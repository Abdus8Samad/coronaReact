const { combineReducers } = require("redux");

const initCases = {
    totalCases:'21,624,941',
    recovered:'14,338,298',
    activeCases:'6,517,539',
    deaths:'769,104',
    recoveryRate:65,
}

const initNews = {
    source:'Reuters',
    url:'',
    publishedAt:'yyyy/mm/dd',
    urlToImage:'https://s4.reutersmedia.net/resources_v2/images/rcom-default.png',
    title:'TITLE',
    content:'................'
}

const initCountries = [];

function cases(state = initCases, action){
    if(action.type === "SET_CASES"){
        return action.cases;
    } else {
        return state;
    }
}

function news(state = initNews, action){
    if(action.type === "SET_NEWS"){
        return action.news;
    } else {
        return state;
    }
}

function countries(state = initCountries,action){
    if(action.type === "SET_COUNTRIES"){
        return action.countries;
    } else {
        return state;
    }
}

export default combineReducers({
    cases,
    news,
    countries
})