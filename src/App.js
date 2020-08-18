import React from 'react';
import Header from './components/header';
import { BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class App extends React.Component{
  state = {
    isDark: false,
    width:window.innerWidth,
    country:'',
    totalCases:'21,624,941',
    recovered:'14,338,298',
    activeCases:'6,517,539',
    deaths:'769,104',
    recoveryRate:65,
    news:{
      source:'Reuters',
      url:'',
      publishedAt:'yyyy/mm/dd',
      urlToImage:'https://s4.reutersmedia.net/resources_v2/images/rcom-default.png',
      title:'TITLE',
      content:'....................................'
    },
    countries:[],
    searchQuery:''
  }
  changeTheme = () =>{
    this.setState(state =>({
      isDark:!state.isDark
    }))
  }
  componentDidMount = () =>{
    const input = document.querySelector('div.countries input');
    input.addEventListener('click',() =>{
      this.style.borderColor = 'red';
    })
    window.addEventListener('resize',() =>{
      this.setState({
        width:window.innerWidth
      })
    });
    Axios.get('https://corona.lmao.ninja/v2/all')
    .then(response =>{
      let { cases : totalCases, active : activeCases, recovered, deaths } = response.data;
      let recoveryRate = ((recovered/totalCases)*100).toString().substr(0,4);
      this.setState({
        totalCases,
        recovered,
        activeCases,
        deaths,
        recoveryRate
      })
    })
    Axios.get('https://newsapi.org/v2/everything?q=covid19&sortBy=published&apiKey=29336bbcaee7403da323c69024a50163')
    .then(response =>{
      let news = response.data.articles[2];
      let { source, url, publishedAt, urlToImage, title, content } = news;
      this.setState({
        news:{
          url,
          source:source.name,
          publishedAt,
          urlToImage,
          title,
          content
        }
      })
    })
    Axios.get('https://corona-api.com/countries')
    .then(response =>{
        let countries = [...response.data.data];
        this.setState({
          countries
        })  
    })
  }
  setCountry = (code) =>{
    let country = this.state.countries.find((country) => country.code === code);
    let { confirmed : totalCases, deaths, recovered, critical : active, calculated } = country.latest_data;
    this.setState({
      totalCases,
      recovered,
      active,
      deaths,
      recoveryRate:Number(calculated.recovery_rate.toString().substr(0,4)),
      country:country.name
    },() =>{
      let parent = document.querySelector('div.countries');
      let elem = document.querySelector(`div#${code}`);
      parent.scrollTo(0, elem.offsetTop - parent.offsetTop);
    })
  }
  inputChange = (e) =>{
    e.preventDefault();
    this.setState({searchQuery:e.target.value},() => {
      document.querySelector('input').focus();
    });
  }
  render(){
    const contentBoxes = {
      boxShadow:this.state.isDark ? '' : '0 0 14px rgba(100,100,100,0.3)',
      background:this.state.isDark ? '#1E1E30' : 'white',
      color:this.state.isDark ? 'white' : 'rgba(0,0,0,0.8)'
    }
    var content;
    const GraphLarge = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph" xmlns="http://www.w3.org/1999/xlink" width="68.417" height="50.603" viewBox="0 0 74.417 56.603"><defs><linearGradient id="a" x1="0.269" y1="0.209" x2="0.573" y2="0.816" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ff6c75"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-250.726 -55.193)"><path className="a" d="M1609.748,195s3.712-10.225,8.512-17.391,14.147-3.826,19.186-5.607,11.247-14,16.281-15.286,9.92,5.268,15.85,2.157,11.178-17.228,11.178-17.228V195Z" transform="translate(-1357 -85)"/><path className="b" d="M1609,195.522s5.463-15.574,12.074-20.876,12.184-.36,16.7-3.076,10.46-14.111,16.212-15,9.624,3.806,14.522,2.675,12.317-17.728,12.317-17.728" transform="translate(-1357 -85)"/></g></svg>;
    const GraphSmall = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph" xmlns="http://www.w3.org/1999/xlink" width="70" height="50" viewBox="0 0 74.417 56.603"><defs><linearGradient id="a" x1="0.269" y1="0.209" x2="0.573" y2="0.816" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ff6c75"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-250.726 -55.193)"><path className="a" d="M1609.748,195s3.712-10.225,8.512-17.391,14.147-3.826,19.186-5.607,11.247-14,16.281-15.286,9.92,5.268,15.85,2.157,11.178-17.228,11.178-17.228V195Z" transform="translate(-1357 -85)"/><path className="b" d="M1609,195.522s5.463-15.574,12.074-20.876,12.184-.36,16.7-3.076,10.46-14.111,16.212-15,9.624,3.806,14.522,2.675,12.317-17.728,12.317-17.728" transform="translate(-1357 -85)"/></g></svg>;
    const GraphXSmall = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph" xmlns="http://www.w3.org/1999/xlink" width="50" height="35" viewBox="0 0 74.417 56.603"><defs><linearGradient id="a" x1="0.269" y1="0.209" x2="0.573" y2="0.816" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ff6c75"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-250.726 -55.193)"><path className="a" d="M1609.748,195s3.712-10.225,8.512-17.391,14.147-3.826,19.186-5.607,11.247-14,16.281-15.286,9.92,5.268,15.85,2.157,11.178-17.228,11.178-17.228V195Z" transform="translate(-1357 -85)"/><path className="b" d="M1609,195.522s5.463-15.574,12.074-20.876,12.184-.36,16.7-3.076,10.46-14.111,16.212-15,9.624,3.806,14.522,2.675,12.317-17.728,12.317-17.728" transform="translate(-1357 -85)"/></g></svg>;
    const Graph1Large = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph1" xmlns="http://www.w3.org/1999/xlink" width="74.465" height="56.603" viewBox="0 0 74.271 56.457"><defs><linearGradient id="a" x1="0.269" y1="0.209" x2="0.573" y2="0.816" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ff6c75"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-250.873 -55.193)"><path className="a" d="M1609.748,195s15.39.917,20.19-6.249,5.427-5.9,7.508-16.749,10.678-15.137,16.281-15.286,9.92,5.268,15.85,2.157,11.178-17.228,11.178-17.228V195Z" transform="translate(-1357 -85)"/><path className="b" d="M1609,195.522s14.119-1.961,20.729-7.263,6.678-8.583,8.041-16.689,7.081-14.529,16.212-15,9.624,3.806,14.522,2.675,12.317-17.728,12.317-17.728" transform="translate(-1357 -85)"/></g></svg>;
    const Graph1Small = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph1" xmlns="http://www.w3.org/1999/xlink" width="70" height="50" viewBox="0 0 74.271 56.457"><defs><linearGradient id="a" x1="0.269" y1="0.209" x2="0.573" y2="0.816" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ff6c75"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-250.873 -55.193)"><path className="a" d="M1609.748,195s15.39.917,20.19-6.249,5.427-5.9,7.508-16.749,10.678-15.137,16.281-15.286,9.92,5.268,15.85,2.157,11.178-17.228,11.178-17.228V195Z" transform="translate(-1357 -85)"/><path className="b" d="M1609,195.522s14.119-1.961,20.729-7.263,6.678-8.583,8.041-16.689,7.081-14.529,16.212-15,9.624,3.806,14.522,2.675,12.317-17.728,12.317-17.728" transform="translate(-1357 -85)"/></g></svg>;
    const Graph1XSmall = () => <svg xmlnsXlink="http://www.w3.org/2000/svg"className="chart graph1"  xmlns="http://www.w3.org/1999/xlink" width="50" height="35" viewBox="0 0 74.271 56.457"><defs><linearGradient id="a" x1="0.269" y1="0.209" x2="0.573" y2="0.816" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ff6c75"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-250.873 -55.193)"><path className="a" d="M1609.748,195s15.39.917,20.19-6.249,5.427-5.9,7.508-16.749,10.678-15.137,16.281-15.286,9.92,5.268,15.85,2.157,11.178-17.228,11.178-17.228V195Z" transform="translate(-1357 -85)"/><path className="b" d="M1609,195.522s14.119-1.961,20.729-7.263,6.678-8.583,8.041-16.689,7.081-14.529,16.212-15,9.624,3.806,14.522,2.675,12.317-17.728,12.317-17.728" transform="translate(-1357 -85)"/></g></svg>;
    const Graph2Large = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph2" xmlns="http://www.w3.org/1999/xlink" width="74.465" height="56.651" viewBox="0 0 74.465 56.651"><defs><linearGradient id="a" x1="0.269" y1="0.209" x2="0.573" y2="0.816" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ff6c75"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-250.592 -55.279)"><path className="a" d="M1609.748,195s8.557-6.611,8.6-17.233,2.525-17.113,7.564-18.894,19.076,10.361,24.109,9.071,10.413-12.562,15.99-18.952,14.745-7.347,14.745-7.347V195Z" transform="translate(-1357 -85)"/><path className="b" d="M1609,195.522s8.782-10.52,8.49-18.819,1.891-15.3,9.038-17.46,18.07,9.148,23.823,8.257,8.671-8.637,13.583-15.614,16.888-10.371,16.888-10.371" transform="translate(-1357 -85)"/></g></svg>;
    const Graph2Small = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph2" xmlns="http://www.w3.org/1999/xlink" width="70" height="50" viewBox="0 0 74.465 56.651"><defs><linearGradient id="a" x1="0.269" y1="0.209" x2="0.573" y2="0.816" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ff6c75"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-250.592 -55.279)"><path className="a" d="M1609.748,195s8.557-6.611,8.6-17.233,2.525-17.113,7.564-18.894,19.076,10.361,24.109,9.071,10.413-12.562,15.99-18.952,14.745-7.347,14.745-7.347V195Z" transform="translate(-1357 -85)"/><path className="b" d="M1609,195.522s8.782-10.52,8.49-18.819,1.891-15.3,9.038-17.46,18.07,9.148,23.823,8.257,8.671-8.637,13.583-15.614,16.888-10.371,16.888-10.371" transform="translate(-1357 -85)"/></g></svg>;
    const Graph2XSmall = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph2"  xmlns="http://www.w3.org/1999/xlink" width="50" height="35" viewBox="0 0 74.465 56.651"><defs><linearGradient id="a" x1="0.269" y1="0.209" x2="0.573" y2="0.816" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#ff6c75"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-250.592 -55.279)"><path className="a" d="M1609.748,195s8.557-6.611,8.6-17.233,2.525-17.113,7.564-18.894,19.076,10.361,24.109,9.071,10.413-12.562,15.99-18.952,14.745-7.347,14.745-7.347V195Z" transform="translate(-1357 -85)"/><path className="b" d="M1609,195.522s8.782-10.52,8.49-18.819,1.891-15.3,9.038-17.46,18.07,9.148,23.823,8.257,8.671-8.637,13.583-15.614,16.888-10.371,16.888-10.371" transform="translate(-1357 -85)"/></g></svg>;
    const Graph3Large = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph3" xmlns="http://www.w3.org/1999/xlink" width="68.465" height="50.603" viewBox="0 0 72.914 54.221"><defs><linearGradient id="a" x1="0.272" y1="0.184" x2="0.545" y2="0.694" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#2fd0aa"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-252.756 -56.076)"><path className="a" d="M254.1,108.949s9.033-4.687,9.073-10.692-.336-20.938,7.708-22.185,7.391,7.341,12.49,7.428,14.833-6.645,14.97-13.106,4.8-6.564,12.437-7.488a30.614,30.614,0,0,0,13.486-5.428v51.378Z"/><path className="b" d="M254.1,108.949s9.033-4.687,9.073-10.692-.336-20.938,7.708-22.185,7.391,7.341,12.49,7.428,14.833-6.645,14.97-13.106,4.8-6.564,12.437-7.488a30.614,30.614,0,0,0,13.486-5.428"/></g></svg>;
    const Graph3Small = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph3" xmlns="http://www.w3.org/1999/xlink" width="70" height="50" viewBox="0 0 72.914 54.221"><defs><linearGradient id="a" x1="0.272" y1="0.184" x2="0.545" y2="0.694" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#2fd0aa"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-252.756 -56.076)"><path className="a" d="M254.1,108.949s9.033-4.687,9.073-10.692-.336-20.938,7.708-22.185,7.391,7.341,12.49,7.428,14.833-6.645,14.97-13.106,4.8-6.564,12.437-7.488a30.614,30.614,0,0,0,13.486-5.428v51.378Z"/><path className="b" d="M254.1,108.949s9.033-4.687,9.073-10.692-.336-20.938,7.708-22.185,7.391,7.341,12.49,7.428,14.833-6.645,14.97-13.106,4.8-6.564,12.437-7.488a30.614,30.614,0,0,0,13.486-5.428"/></g></svg>;
    const Graph3XSmall = () => <svg xmlnsXlink="http://www.w3.org/2000/svg" className="chart graph3"  xmlns="http://www.w3.org/1999/xlink" width="50" height="35" viewBox="0 0 72.914 54.221"><defs><linearGradient id="a" x1="0.272" y1="0.184" x2="0.545" y2="0.694" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#2fd0aa"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs><g transform="translate(-252.756 -56.076)"><path className="a" d="M254.1,108.949s9.033-4.687,9.073-10.692-.336-20.938,7.708-22.185,7.391,7.341,12.49,7.428,14.833-6.645,14.97-13.106,4.8-6.564,12.437-7.488a30.614,30.614,0,0,0,13.486-5.428v51.378Z"/><path className="b" d="M254.1,108.949s9.033-4.687,9.073-10.692-.336-20.938,7.708-22.185,7.391,7.341,12.49,7.428,14.833-6.645,14.97-13.106,4.8-6.564,12.437-7.488a30.614,30.614,0,0,0,13.486-5.428"/></g></svg>;
    const graph = (graphName) =>{
      switch(graphName){
        case 'GraphLarge':
          return <GraphLarge />
        case 'GraphSmall':
          return <GraphSmall />
        case 'GraphXSmall':
          return <GraphXSmall />
        case 'Graph1Large':
          return <Graph1Large />
        case 'Graph1Small':
          return <Graph1Small />
        case 'Graph1XSmall':
          return <Graph1XSmall />
        case 'Graph2Large':
          return <Graph2Large />
        case 'Graph2Small':
          return <Graph2Small />
        case 'Graph2XSmall':
          return <Graph2XSmall />
        case 'Graph3Large':
          return <Graph3Large />
        case 'Graph3Small':
          return <Graph3Small />
        default:
          return <Graph3XSmall />  
        }
    }
    const RecoveryRate = () =>{
      return(
        <div style={contentBoxes} className="recoveryRate">
        <h4>Ratio Of Recovery</h4>
        <div className="progress">
        <CircularProgressbar
          value={this.state.recoveryRate}
          text={`${this.state.recoveryRate}%`}
          strokeWidth={4}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,
        
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
        
            // Text size
            textSize: '16px',
        
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
        
            // Can specify path transition in more detail, or remove it entirely

            // Colors
            pathColor: this.state.isDark ? '#5600E8' : '#2fd0aa',
            textColor: this.state.isDark ? '#5f00ff' : '#12a381',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
      })} 
      />
        </div>
        <div className="stats">
          <p>{this.state.totalCases/1000}k Affected</p>
          <p>{this.state.recovered/1000}k Recovered</p>
        </div>  
    </div>
      )
    }
    const News = () =>{
      return(
        <div className="news" style={contentBoxes}>
          <h3>News</h3>
          <h6>
            <div className="source">
              Source: <a href={this.state.news.url}>{this.state.news.source}</a>
            </div>
            <div className="date">
              {this.state.news.publishedAt.substr(0,10).replace(/-/g,'/')}
            </div>
          </h6>
          <div className="content">
            <img src={this.state.news.urlToImage} alt={this.state.news.source}/>
            <h4>{this.state.news.title}</h4><br />
            <p>{this.state.news.content.substr(0,100)}...</p>
          </div>
        </div>
      )
    }
    const CountryCards = () =>{
      return(
        <div className="countryCards">
          {this.state.countries.sort((a, b) => b.latest_data.confirmed - a.latest_data.confirmed).filter((country) => country.name.toUpperCase().includes(this.state.searchQuery.toUpperCase())).map(country =>{
            return(
              <div className="country" style={{"border":this.state.country == country.name ? '1px solid red' : ''}} id={country.code} key={country.code} onClick={() => this.setCountry(country.code)}>
                <img src={`https://www.countryflags.io/${country.code}/flat/64.png`} alt={country.name+' flag'}/>
                <h4>{country.name}</h4>
                <svg xmlns="http://www.w3.org/2000/svg" className="upArrow" width="14" height="7" viewBox="0 0 14 9"><path className="a" d="M6.211,1.015a1,1,0,0,1,1.579,0l4.955,6.371A1,1,0,0,1,11.955,9H2.045a1,1,0,0,1-.789-1.614Z"/></svg>
                <p>{country.latest_data.confirmed/1000}k Affected | {country.latest_data.recovered/1000}k Recovered</p>
              </div>
            )
          })}
        </div>
      )
    }
    const Countries = () =>{
      return(
        <div className="countries" style={contentBoxes}>
            <input type="text" name="query" value={this.state.searchQuery} id="country" placeholder="Search Location" onChange={(e) => this.inputChange(e)} style={{"background":this.state.isDark?'rgba(0,0,0,0.2)' : '#ebebeb'}}/>
          <CountryCards />
        </div>
      )
    }
    const cases = (className,name,arrow,count,graphName) =>{
      if(this.state.width > 760) {
        return (
          <div style={contentBoxes} className={"case " + className}>
            <div>
              <p>
                {name}
                <svg xmlns="http://www.w3.org/2000/svg" className={arrow} width="14" height="9" viewBox="0 0 14 9"><path className="a" d="M6.211,1.015a1,1,0,0,1,1.579,0l4.955,6.371A1,1,0,0,1,11.955,9H2.045a1,1,0,0,1-.789-1.614Z"/></svg>
              </p>
              <h2>{count.toLocaleString('en-US')}</h2>
            </div>
            <div>
              {graph(graphName)}
            </div>
          </div>
        )
      } else {
        return (
          <div style={contentBoxes} className={"case " + className}>
              <h4>
                {name}
                <svg xmlns="http://www.w3.org/2000/svg" className={arrow} width="10" height="6" viewBox="0 0 14 9"><path className="a" d="M6.211,1.015a1,1,0,0,1,1.579,0l4.955,6.371A1,1,0,0,1,11.955,9H2.045a1,1,0,0,1-.789-1.614Z"/></svg>  
              </h4>
              <h2>{count.toLocaleString('en-US')}</h2>
              <div>
                {graph(graphName)}
              </div>
          </div>
        )
      }
    }
    if(this.state.width >= 1300){
      content = 
      <div className="content">
        <div className="cases">
          {cases('totalCases','Total Cases','upArrow',this.state.totalCases,'GraphLarge')}
          {cases('recovered','Recovered','downArrow',this.state.recovered,'Graph3Large')}
          {cases('activeCases','Active Cases','upArrow',this.state.activeCases,'Graph2Large')}
          {cases('totalDeaths','Total Deaths','downArrow',this.state.deaths,'Graph1Large')}
          {<RecoveryRate />}
        </div>
      <div className="others">
        {<News />}
        {<Countries />}
      </div>  
    </div>
    } else if(this.state.width >= 900 && this.state.width < 1300){
     content = 
     <div className="content">
        <div className="cases">
          {cases('totalCases','Total Cases','upArrow',this.state.totalCases,'GraphSmall')}
          {cases('recovered','Recovered','downArrow',this.state.recovered,'Graph3Small')}
          {cases('activeCases','Active Cases','upArrow',this.state.activeCases,'Graph2Small')}
          {cases('totalDeaths','Total Deaths','downArrow',this.state.deaths,'Graph1Small')}
        </div>
        <div className="others">
          {<News />}
          {<Countries />}
        </div>
          {<RecoveryRate />}
      </div>
    } else {
      content = 
      <div className="content">
        <div className="cases">
          {cases('totalCases','Total Cases','upArrow',this.state.totalCases,'GraphXSmall')}
          {cases('recovered','Recovered','downArrow',this.state.recovered,'Graph3XSmall')}
          {cases('activeCases','Active Cases','upArrow',this.state.activeCases,'Graph2XSmall')}
          {cases('totalDeaths','Total Deaths','downArrow',this.state.deaths,'Graph1XSmall')}
        </div>
        {<Countries />}
        {<News />}
        {<RecoveryRate />}
      </div>       
    }
    return(
      <div className="App">
        <Router>
          <Header isDark={this.state.isDark} changeTheme={this.changeTheme}/>
            {content}
        </Router>
      </div>
    )
  }
}

export default App;
