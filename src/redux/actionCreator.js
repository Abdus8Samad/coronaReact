function setCases(cases){
    return (dispatch, getState) =>{
        // Some Async Function
        dispatch({type:'SET_CASES',cases})
    }
}

function setNews(news){
    return (dispatch, getState) =>{
        //Some Async Function
        dispatch({type:'SET_NEWS',news})
    }
}

function setCountries(countries){
    return (dispatch, getState) =>{
        //Some Async Function
        dispatch({type:'SET_COUNTRIES',countries})
    }
}
export {
    setCases,
    setNews,
    setCountries
}