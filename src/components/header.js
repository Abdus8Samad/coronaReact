import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component{
    state = {
        linksDisplay:(window.innerWidth < 800) ? "none" : "flex",
        sideNav:false
    }
    componentDidMount = () =>{
        const img = document.querySelector('div.logo img');
        const svg = document.querySelector('div.logo svg');
        const span = document.querySelector('div.logo span');
        if(window.innerWidth < 800){
            img.style.display = "inline-block";
            svg.style.left = "15px";
            span.style.left = "90px";
            this.setState({
                linksDisplay:"none"
            })
        }
        window.addEventListener('resize',() =>{
            if(window.innerWidth < 800){
                img.style.display = "inline-block";
                svg.style.left = "15px";
                span.style.left = "90px";
                this.setState({
                    linksDisplay:"none"
                })
            } else {
                img.style.display = "none";
                svg.style.left = '0';
                span.style.left = "60px";
                this.setState({
                    linksDisplay:"flex"
                })
            }
        })
    }
    links = (target) =>{
        document.querySelectorAll('a').forEach(link =>{
            link.classList.remove('active');
        })
        target.classList.add('active');
    }
    sidenav = () =>{
        const overlay = document.querySelector('div.overlay');
        const sidenav = document.querySelector('div.sidenav');
        this.setState(state =>({
            sideNav:!state.sideNav
        }))
        if(this.state.sideNav){
            overlay.style.opacity = '0';
            sidenav.style.left = "-200px";
            overlay.style.visibility = "hidden";
        } else {
            overlay.style.visibility = "visible";
            overlay.style.opacity = '1';
            sidenav.style.left = '0';
        }
    }
    switchTheme = (target) =>{
        if(this.props.isDark){
            target.setAttribute("src","https://img.icons8.com/plasticine/50/000000/crescent-moon.png");
            document.querySelector('body').style.background = "#f7f7f7";
            document.querySelectorAll('a').forEach(elem => elem.style.color = "rgba(0,0,0,0.8)");
        } else {
            target.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEDklEQVRoge2ZXYhVVRTHf9txGiULRDO/SBBDMBOELMpCjRERP0J9MpwioofMegpLeggEBQuFFEKCiqIMTB8io6wwAl/6pjL7II0RFDUToiiCyV8PZ10cpnvvOWfmXO/L/cNhztnz3/+11pw9a6+1D3TQQQcddNAGpKoF1S5gNjAXmAwMpJSer9pOS6B2qcvVN9QL6l/qWfVf9bl2+5cLNan3qj+oZ9Sn1dvUVepP6p3t9jEX6gz1iHoygrkqxherP6oz2u1jLtSl6q/qbvXqQeNTI7A5Q/gz1ZlX3tMmUNeov6ur4nmR+lTcv6luHMKfoO6Ka0IB/dYHrS5RL6q98dyn9sX9AvX7yFo1/tJYfjfFdURd2kS/VNDDDWJ6LKdVDX7/qvpQnfGt6pS4tjbRLxX0UIwqSgReAl5LKb2tPqFOGuREN7AcOFhnXjfwcFzdjcRTSh8AR4GLcR2NsUIYXYSkrgOmASvVZcCplNL5QZT5MXaxjoNbijrD5aBr99Uh9opv1PXqWPXZOpwH1JcrNVwSRZbWEqAH2A88COytw5kIXKjQr9IoEsgG4EWyumxaSulEHU4XMFClY2VRJJBlwHvAQuCjBpyzZAVi29A0EPXGuP0WWAR83IB6hiwZtA15b2QOcCylJNCVUvqnAe9zYIE6pqhhdYx6uMycZsgL5AbgXM12I1Kk3S+B3iJG1c3ATmAXsDOeR4S8feQaLgfyRw53H/AIcKiA3X6yfeewOp4mf6RKoG5Rtxfkjo6+5O4C3B51v7ojfvbk8Herjxb1u57AJnVPCf7q6EXG5/DGqWsj+LXquCbcxdFpbirjez3HiiyVwXN2qO+rhcqfHK2Z6s9mbfPakQjNUvtLzhmlHohgmr6ZHJ2bo11eof6tzh6uVk3wdNlGJ4J5JhwplMkGze1SH1NPqAvV29VzaplKva7wC+rjw5y7OhLAYbMDibFNuBPVjRH8vlqbEP3MK3m2cs+11LvICsW5sTGWQvyv3A+sB24BPgNOA+fJ9rFJwDxgKlnq3pNS+irm9pCl6g0ppQ9HFEgIfgpsSym9VTaQITrjyYKZAlwfw+eA74CvU0oDQ/j3AZuBeSmlSyOxXRNcHkukab6vEuq1an80dZUKH1S3VSra3N5e9d1WCF+nnlJXVC7+f1vrYu+Y3ioDt0YqvKMlBjIby8zOzRa1ykbNUG8Es7IF2veov9ngyKlyxJs5pW6vIgFEb7InltOVPfiODexAFIlrhrPzRtHYFxqH1Pa1y7GmP1GPq5vVWTn8pM5Xn4yC8IsqlmllX6xiSWwAVpA1SseAX8gasm6yHXwy2ZesS8A7wOsppUbnAKVQ+ac3yMpvsn5/BlDrNf4kKzeOp5ROtsJuBx100EEHVxz/AYmDcj42joUYAAAAAElFTkSuQmCC")
            document.querySelector('body').style.background = "#161625";
            document.querySelectorAll('a').forEach(elem => elem.style.color = "#f5f5f5");
        }
        this.props.changeTheme();
    }
    render(){
        return(
            <div className="Header" style={{"background":this.props.isDark ? "#1E1E30" : "white","color":"white"}}>
                <div className="overlay" onClick={this.sidenav}></div>
                <div className="sidenav" style={{"background":this.props.isDark ? "#1E1E30" : "white","color":"white"}}>
                    <Link to='/'>HOME</Link>
                    <Link to='/'>FAQ'S</Link>
                    <Link to='/'>HELPFUL LINKS</Link>
                    <Link to='#' onClick={this.sidenav}>BACK</Link>
                </div>
                <div className="container">
                    <div className="logo">
                        {this.props.isDark ?(
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAKklEQVRIiWNgGOqA8f////9paQETLQ0fBaNgiIDRjDYKRgEdwGhGG3gAAPmPC/5Ei27iAAAAAElFTkSuQmCC" alt="SideMenu" onClick={this.sidenav}/>
                        ) : (
                            <img src="https://img.icons8.com/android/24/000000/menu.png" alt="SideMenu" onClick={this.sidenav} />
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" width="46.491" height="45.714" viewBox="0 0 46.491 45.714"><g transform="translate(0 -4.053)"><g transform="translate(0 4.053)"><g transform="translate(0 0)"><path className="a" d="M46.478,24.967a4,4,0,0,1-3.451,4.356,3.681,3.681,0,0,1-3.69-2.168l-1.883.166-1.422.686a1.074,1.074,0,0,0-.594.824,12.541,12.541,0,0,1-.717,2.77,1.069,1.069,0,0,0,.061.91l.507.906,1.408.945a2.533,2.533,0,1,1-1.6,2.714l-1.561-1.047-.982-.12a1.131,1.131,0,0,0-.919.31,12.714,12.714,0,0,1-2.783,2.011,1.118,1.118,0,0,0-.586.919l-.125,1.99.618,2.451a3.146,3.146,0,1,1-3.047.783l-.621-2.466-.958-1.541a1.4,1.4,0,0,0-1.2-.657h-.008a12.7,12.7,0,0,1-2.455-.24,1.4,1.4,0,0,0-1.293.406L17.91,41.212l-1.418,2.942a2.532,2.532,0,1,1-2.843-1.347l1.427-2.961.28-1.987a1.056,1.056,0,0,0-.377-.968A12.751,12.751,0,0,1,12.11,33.6a1.053,1.053,0,0,0-.893-.5l-1.984-.019-2.172.683A3.543,3.543,0,1,1,5.983,30.8l2.306-.725,1.684-1.2a.867.867,0,0,0,.359-.78q-.042-.508-.042-1.026a12.559,12.559,0,0,1,1.149-5.261.864.864,0,0,0-.009-.738l-.5-1.02L9.577,19.033a2.532,2.532,0,1,1,1.748-2.621l1.5,1.132,1.512.27a12.666,12.666,0,0,1,3.793-2.43l.355-2.157L18.037,11a3.631,3.631,0,0,1-2.692-2.712,3.548,3.548,0,0,1,2.939-4.163A3.751,3.751,0,0,1,22.7,6.891,3.444,3.444,0,0,1,21.146,10.5l.423,2.1,1.039,1.658a.371.371,0,0,0,.315.174h0a12.55,12.55,0,0,1,6.51,1.811.367.367,0,0,0,.343.019l1.627-.754,1.9-2.055a2.532,2.532,0,1,1,2.309,2.136l-1.9,2.055-.617,1.66a.367.367,0,0,0,.048.343,12.57,12.57,0,0,1,1.76,3.4,1.079,1.079,0,0,0,.726.7l1.545.433,2.007-.177a3.88,3.88,0,0,1,3.23-2.644,3.781,3.781,0,0,1,4.064,3.6Z" transform="translate(0 -4.053)"/><path className="b" d="M2.827.486a2.5,2.5,0,1,1-2.5,2.5A2.5,2.5,0,0,1,2.827.486Z" transform="translate(33 6)"/></g></g><g transform="translate(13.568 17.716)"><circle className="b" cx="9.357" cy="9.357" r="9.357"/></g><g transform="translate(4.517 4.734)"><circle className="b" cx="2.664" cy="2.664" r="2.664" transform="translate(0 0)"/><path className="b" d="M2.492.262a2.26,2.26,0,1,1-2.26,2.26A2.26,2.26,0,0,1,2.492.262Z" transform="translate(7.176 38.027)"/><circle className="b" cx="2.592" cy="2.592" r="2.592" transform="translate(31.657 38.086)"/><circle className="c" cx="2.417" cy="2.417" r="2.417" transform="translate(13.119 17.342)"/><circle className="c" cx="1.645" cy="1.645" r="1.645" transform="translate(15.831 25.621)"/><circle className="c" cx="1.381" cy="1.381" r="1.381" transform="translate(21.259 20.958)"/></g></g></svg>
                        <span>COVID'19</span>
                    </div>
                    <div className="navs" style={{"display":this.state.linksDisplay}}>
                        <Link className="home active" to='/' onClick={({target}) => this.links(target)}>HOME</Link>
                        <Link className="faq" to='/' onClick={({target}) => this.links(target)}>FAQ's</Link>
                        <Link className="links" to='/' onClick={({target}) => this.links(target)}>HELPFUL LINKS</Link>
                    </div>
                    <div className="theme">
                        <img src="https://img.icons8.com/plasticine/50/000000/crescent-moon.png" onClick={({target}) => this.switchTheme(target)} alt={this.props.isDark ? "DarkTheme" : "LightTheme"}/>
                    </div>
                </div>
            </div>
        )
    }
}