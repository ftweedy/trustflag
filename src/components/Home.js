import React from "react"
import { Link } from "react-router-dom";
import OwnedFlag from "./OwnedFlag";
import * as styles from './Home.style'
import logo from '../logo.png';
import Search from "./Search";
import FlagDetails from "./FlagDetails";
import Flag from "./Flag";

const USER_ID = 1;

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeFlags: [],
            name: "",
            location: "",
            license_plate: "",
            phone: "",
            searchedFlags: [],
            view: 'search'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.deleteFlag = this.deleteFlag.bind(this)
        this.fetchActiveFlags = this.fetchActiveFlags.bind(this)
        this.handleBackClick = this.handleBackClick.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
    }

    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSearch() {
        const { name, location, license_plate, phone } = this.state
        const params = []
        let searchTerms = ""
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
        console.log(params)

        for (let i = 0; i < params.length; i++){
            params[i] = params[i].replace(/,/g,"");
            searchTerms = searchTerms + params[i] + ","
        }

        if (searchTerms !== ""){
            let url = new URL("http://localhost:8080/flags/search")
            url.searchParams.append("keywords", searchTerms)
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(flags => {
                    const newState = {searchedFlags: flags};
                    if (flags.length === 0){
                        newState.view = 'noMatch'
                    } else {
                        newState.view = 'match'
                    }
                    this.setState(newState);
                })
        }
    }
    
    handleCreate(){
        const {name, licensePlateNumber, phoneNumber, location, expirationDate} = this.state;
        const flag = {
            name: name || null,
            licensePlateNumber: licensePlateNumber || null,
            phoneNumber: phoneNumber || null,
            location: location || null,
            userId: USER_ID,
            expirationDate: expirationDate || null
        }
        
        fetch("http://localhost:8080/flags", {method: 'POST', body: JSON.stringify(flag), headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => {
                this.fetchActiveFlags()
                this.setState({view: 'created', name: "", location: "", phoneNumber: "", licensePlateNumber: ""})
            })
    }
    
    deleteFlag(id){
        fetch("http://localhost:8080/flags/" + id, {method: 'DELETE'})
            .then(response => {
                this.fetchActiveFlags()
            })
    }
    
    handleBackClick(){
        this.setState({
            name: "",
            location: "",
            license_plate: "",
            phone: "",
            searchedFlags: [],
            view: 'search'
        })
    }
    
    fetchActiveFlags(){
        fetch("http://localhost:8080/flags/user/" + USER_ID)
            .then(response => {
                return response.json();
            })
            .then(activeFlags => {
                this.setState({activeFlags});
            })
    }

    componentDidMount() {
        this.fetchActiveFlags()
    }

    render () {
        const {activeFlags, view, name, phoneNumber, licensePlateNumber, location, searchedFlags} = this.state;
        return (
            <div>
                <div className="row" style={styles.HEADER}>
                    <div className="col-sm-2">
                        <img alt="logo" src={logo} style={styles.LOGO}/>
                    </div>
                    <div className="col-sm-2 col-sm-offset-6">
                        <div>My Account</div>
                    </div>
                    <div className="col-sm-2">
                        <Link to="/"><div style={{color: 'white'}}>Logout</div></Link>
                    </div>
                </div>
                <div className="row" style={{boxSizing: 'content-box'}}>
                    <div className="col-sm-3">
                        <div style={styles.FLAGS_HEADER}>Active Flags</div>
                        {Array.isArray(activeFlags) && activeFlags.map((flag, i) => <OwnedFlag key={i} onDelete={this.deleteFlag} flag={flag}/> )}
                    </div>
                    {view === 'search' && 
                        <div className="col-sm-7">
                            <Search onChange={this.handleChange} onSearch={this.handleSearch}/>
                        </div>
                    }
                    {view === 'match' &&
                        <div className="col-sm-7">
                            <br/>
                            <div>Match found. Please contact:</div>
                            {searchedFlags && searchedFlags.map((flag, i) => <Flag key={i} flag={flag}/>
                            )}
                            <div className="row">
                                Flag expires: <input type="date" onChange={this.handleChange} placeholder="Expiration date" name="expirationDate" />
                                <div className="col-sm-6">
                                    <button style={styles.BUTTON} onClick={this.handleCreate}>Add flag</button>
                                </div>
                                <div className="col-sm-6">
                                    <button style={styles.BUTTON} onClick={this.handleBackClick}>Back</button>
                                </div>
                            </div>
                        </div>
                    }
                    {view === 'noMatch' &&
                        <div className="col-sm-7">
                            <div>
                                <div className="row">
                                    <br />
                                    <div className="col-sm-4 col-sm-offset-4">
                                        <div>No match found</div>
                                    </div>
                                </div>
                                <FlagDetails name={name} location={location} licensePlateNumber={licensePlateNumber} phoneNumber={phoneNumber}/>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-sm-offset-1" style={{textAlign: 'left'}}>
                                    Flag expires: <input type="date" onChange={this.handleChange} placeholder="Expiration date" name="expirationDate" />
                                </div>
                            </div>
                            <div className="row">
                                <br/>
                                <div className="col-sm-4">
                                    <button style={styles.BUTTON} onClick={this.handleCreate}>Add flag</button>
                                </div>
                                <div className="col-sm-4">
                                    <button style={styles.BUTTON} onClick={this.handleBackClick}>Back</button>
                                </div>
                            </div>
                        </div>
                    }
                    {view === 'created' &&
                        <div className="col-sm-7">
                            <br/>
                            <div>Flag created</div>
                            <Search onChange={this.handleChange} onSearch={this.handleSearch}/>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Home
