import React from "react"
import { Table, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { Link } from "react-router-dom";
import OwnedFlag from "./OwnedFlag";
import * as styles from './Home.style'
import logo from '../logo.png';
import FlagSearch from "./FlagSearch";
import FlagDetails from "./FlagDetails";
import Flag from "./Flag";
import NoMatch from './NoMatch'

const USER_ID = 1;

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeFlags: [],
            name: "",
            location: "",
            licensePlateNumber: "",
            phoneNumber: "",
            searchedFlags: [],
            view: 'dashboard',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    toLogIncident = () => {
        this.setState({ view: 'log' })
    }

    toDashboard = () => {
        const { activeFlags } = this.state
        console.log(activeFlags[0])
        Array.isArray(activeFlags) && activeFlags.map((flag, i) => 
            console.log(flag.name, flag.location, flag.phoneNumber, flag.licensePlateNumber))
        this.setState({ view: 'dashboard' })
    }

    handleSearch = () => {
        const { name, location, licensePlateNumber, phoneNumber } = this.state
        const params = []
        let searchTerms = ""
        if (name !== ""){
            params.push(name)
        }
        if (location !== ""){
            params.push(location)
        }
        if (licensePlateNumber !== ""){
            params.push(licensePlateNumber)
        }
        if (phoneNumber !== ""){
            params.push(phoneNumber)
        }

        for (let i = 0; i < params.length; i++){
            params[i] = params[i].replace(/,/g,"");
            searchTerms = searchTerms + params[i] + ","
        }

        if (searchTerms !== ""){
            let url = new URL("http://localhost:8080/flags/search")//un-hardcode for live
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
    
    handleCreate = () => {
        const {name, licensePlateNumber, phoneNumber, location, expirationDate} = this.state;
        const flag = {
            name: name || null,
            licensePlateNumber: licensePlateNumber || null,
            phoneNumber: phoneNumber || null,
            location: location || null,
            userId: USER_ID,
            expirationDate: expirationDate || null
        }
        
        fetch("http://localhost:8080/flags", {
            method: 'POST', 
            body: JSON.stringify(flag), 
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(response => {
                this.fetchActiveFlags()
                this.setState({view: 'dashboard', name: "", location: "", phoneNumber: "", licensePlateNumber: ""})
            })
    }
    
    deleteFlag = (id) => {
        fetch("http://localhost:8080/flags/" + id, {method: 'DELETE'})
            .then(response => {
                this.fetchActiveFlags()
            })
    }
    
    handleBackClick = () => {
        this.setState({
            name: "",
            location: "",
            licensePlateNumber: "",
            phoneNumber: "",
            searchedFlags: [],
            view: 'search'
        })
    }
    
    fetchActiveFlags = () => {
        fetch("http://localhost:8080/flags/user/" + USER_ID)
            .then(response => {
                return response.json();
            })
            .then(activeFlags => {
                this.setState({activeFlags});
            })
    }

    componentDidMount = () => {
        this.fetchActiveFlags()
    }

    render = () => {
        const {activeFlags, view, name, phoneNumber, licensePlateNumber, location, searchedFlags} = this.state;
        const { SearchBar, ClearSearchButton } = Search;
        const columns = [
            {dataField: 'id', text: 'ID'}, 
            {dataField: 'name', text: 'Person Name'}, 
            {dataField: 'phoneNumber', text: 'Phone Number'},
            {dataField: 'location', text: 'Location'}, 
            {dataField: 'licensePlateNumber', text: 'License Plate Number'}, 
            {dataField: 'expirationDate', text: "Expiration Date"}
        ];

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
                        <div className="row">
                            <Button onClick={this.toDashboard} block>Home</Button>
                        </div>
                        <div className="row">
                            <Button onClick={this.toLogIncident} block>Log Incident</Button>
                        </div>
                        <div className="row">
                            <Link to="/"><Button block>Logout</Button></Link>
                        </div>
                    </div>
                    {view === 'dashboard' && 
                        <div className="col-sm-7">
                            <br/>

                            <div className="row">
                                <div className="col-sm-3">
                                    Welcome back!
                                </div>
                                <div className="col-sm-offset-10">
                                    <Button onClick={this.toLogIncident}>Log Incident</Button>
                                </div>
                            </div>

                            <br/>

                            <ToolkitProvider keyField="id" data={ activeFlags } columns={ columns } search>
                            {
                                props => (
                                <div>
                                    <h3>Input something at below input field:</h3>
                                    <SearchBar { ...props.searchProps } />
                                    <ClearSearchButton { ...props.searchProps } />
                                    <hr />
                                    <BootstrapTable
                                    { ...props.baseProps }
                                    />
                                </div>)
                            }
                            </ToolkitProvider>
                            {/* <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Location</th>
                                    <th>License Plate #</th>
                                    <th>Expires</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(activeFlags) && activeFlags.map((flag, i) => <OwnedFlag key={i} onDelete={this.deleteFlag} flag={flag}/> )}
                            </tbody>
                            </Table> */}
                        </div>
                    }
                    {view === 'log' &&
                        <div className="col-sm-7">
                            <FlagSearch onChange={this.handleChange} onSearch={this.handleSearch}/>
                        </div>
                    }
                    {view === 'match' &&
                        <div className="col-sm-7">
                            <br/>
                            <div>Match found. Please contact:</div>
                            {searchedFlags && searchedFlags.map((flag, i) => <Flag key={i} flag={flag}/>
                            )}
                            <div className="row">
                                <div className="col-sm-4 col-sm-offset-1" style={styles.CONTAINER}>
                                    <div>Do you still want to add a flag?</div>
                                    <FlagDetails name={name} location={location} licensePlateNumber={licensePlateNumber} phoneNumber={phoneNumber}/>
                                    <div>Flag expires: <input type="date" onChange={this.handleChange} placeholder="Expiration date" name="expirationDate" /></div>
                                </div>
                            </div>
                            <div className="row">
                                <br/>
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
                                <div className="col-sm-4 col-sm-offset-1" style={styles.CONTAINER}>
                                    <div>Flag expires: <input type="date" onChange={this.handleChange} placeholder="Expiration date" name="expirationDate" /></div>
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
                            <FlagSearch onChange={this.handleChange} onSearch={this.handleSearch}/>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Home
