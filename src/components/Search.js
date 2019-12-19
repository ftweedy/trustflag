import React from "react"
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types"

class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        name: "",
        location: "",
        license_plate: "",
        phone: "",
        flags: []
    }
    
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
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
  

  render () {
    const {flags} = this.state;
      
    return (
        <div className="Search">
            <React.Fragment>
                <br />
                <div>Search for persons of interest</div>
                <i>Include at least one field</i>
                <input onChange={this.handleChange} type="text" placeholder="Enter Name" name="name" />
                
                <input onChange={this.handleChange} type="text" placeholder="Enter location" name="location" />
                
                <input onChange={this.handleChange} type="text" placeholder="Enter license plate" name="license_plate" />
                
                <input onChange={this.handleChange} type="text" placeholder="Enter phone number" name="phone" />
                
                <button onClick={this.handleSearch}>Search Flag</button>
                <div>Results</div>
                {Array.isArray(flags) && flags.map((flag) => {
                    return <div>{flag.user.email} - Expires {flag.expires ? flag.expires.split("T")[0] : 'Never'}</div>
                })
                }
            </React.Fragment>
        </div>
    );
  }
}

export default Search