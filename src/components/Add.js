import React from "react"
import { Link } from "react-router-dom";
// import PropTypes from "prop-types"

class Add extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        name: "",
        location: "",
        license_plate: "",
        phone: "",
        success: false
    }
    
    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAdd() {
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
        let url = new URL("http://localhost:8080/flags")
        fetch(url, {
          body: JSON.stringify(search_term),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        })
          .then(response => {
            this.setState({success: true});
          })
          .catch(e => {
              console.log("Error", e);
          });
    }
  }

  render () {
    let { success } = this.state
    return (
        <div className="Search">
          <React.Fragment>
            <h1>Add</h1>
            <label for="name"><b>Enter name for adding a flag</b></label>
            <input onChange={this.handleChange} type="text" placeholder="Enter Search Entity" name="name" />

            <label for="location"><b>Enter location for adding a flag</b></label>
            <input onChange={this.handleChange} type="text" placeholder="Enter Search Entity" name="location" />

            <label for="license_plate"><b>Enter license plate for adding a flag</b></label>
            <input onChange={this.handleChange} type="text" placeholder="Enter Search Entity" name="license_plate" />

            <label for="phone"><b>Enter phone number for adding a flag</b></label>
            <input onChange={this.handleChange} type="text" placeholder="Enter Search Entity" name="phone" />
                
            <button onClick={this.handleAdd}>Add Flag</button>
            {success &&
              <div>Your new flag has been created.</div>
            }
            <Link to="/home"><button>Home Page</button></Link>
          </React.Fragment>
        </div>
    );
  }
}

export default Add