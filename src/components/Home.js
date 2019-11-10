import React from "react"
import { Link } from "react-router-dom";
import OwnedFlag from "./OwnedFlag";
import * as styles from './Home.style'
import logo from '../logo.png';
import Search from "./Search";

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeFlags: [],
            name: "",
            location: "",
            license_plate: "",
            phone: "",
            flags: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSearch() {
        let { name, location, license_plate, phone } = this.state
        let params = []
        let search_term = ""
        if (name !== ""){
            params.push(name)
        }
        if (location !== ""){
            params.push(location)
        }
        if (license_plate !== ""){
            params.push(license_plate)
        }
        if (phone !== ""){
            params.push(phone)
        }

        for (let i = 0; i < params.length; i++){
            params[i] = params[i].replace(/,/g,"");
            search_term = search_term + params[i] + ","
        }

        if (search_term !== ""){
            let url = new URL("http://localhost:8080/flags/search")
            url.searchParams.append("keywords", search_term)
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    this.setState({flags: json});
                })
                .catch(e => {
                    console.log("Error", e);
                });
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/flags/user/1")
            .then(response => {
                return response.json();
            })
            .then(activeFlags => {
                this.setState({activeFlags});
            })
    }

    render () {
        const {activeFlags} = this.state;
        return (
            <div className="Home">
                <React.Fragment>
                    <div className="row" style={styles.HEADER}>
                        <div className="col-sm-2">
                            <img alt="logo" src={logo} style={styles.LOGO}/>
                        </div>
                        <div className="col-sm-2 col-sm-offset-8">
                            <Link to="/"><button>Logout</button></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <div style={styles.FLAGS_HEADER}>Active Flags</div>
                            {activeFlags && activeFlags.map(flag => <OwnedFlag flag={flag}/> )}
                        </div>
                        <div className="col-sm-8">
                            <Search onChange={this.handleChange} onSearch={this.handleSearch}/>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

export default Home
