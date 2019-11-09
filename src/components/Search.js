import React from "react"
import { Link } from "react-router-dom";
// import PropTypes from "prop-types"

class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      form: {
        name: "",
        location: "",
        license_plate: "",
        phone: ""
      }
    }
  }

  handleNameChange = event => {
    const { form } = this.state;
    form[event.target.name] = event.target.value;
    console.log(form.name)
    this.setState({ form: form });
  };

  handleLocationChange = event => {
    const { form } = this.state;
    form[event.target.location] = event.target.value;
    this.setState({ form: form });
  };

  handleLicensePlateChange = event => {
    const { form } = this.state;
    form[event.target.license_plate] = event.target.license_plate;
    this.setState({ form: form });
  };

  handlePhoneChange = event => {
    const { form } = this.state;
    form[event.target.phone] = event.target.value;
    this.setState({ form: form });
  };

  handleSearch() {
    let { name, location, license_plate, phone } = this.state.form
    let params = []
    let search_term = ""
    if (name != ""){
      params.push(name)
    } else if (location != ""){
      params.push(location)
    } else if (license_plate != ""){
      params.push(license_plate)
    } else if (phone != ""){
      params.push(phone)
    }

    for (let i = 0; i < params.length; i++){
      params[i] = params[i].replace(/,/g,"");
      search_term = search_term + params[i] + ", "
    }

    let url = new URL("http://localhost:8080/flags/search")
    url.searchParams.append("keywords", search_term)
    fetch(url)
      .then(response => {
        return response.json();
      }).then(json => {
        let { data } = this.state
        this.setState({ data: json });
        })
        .catch(e => {
          console.log("Error", e);
    })
  }
  

  render () {
    return (
        <div className="Search">
            <React.Fragment>
                <h1>Search</h1>
                <label for="name"><b>Enter name for search</b></label>
                <input type="text" placeholder="Enter Search Entity" name="name" onChange={this.handleNameChange} />

                <label for="location"><b>Enter location for search</b></label>
                <input type="text" placeholder="Enter Search Entity" name="location" />

                <label for="license_plate"><b>Enter license plate for search</b></label>
                <input type="text" placeholder="Enter Search Entity" name="license_plate" />

                <label for="phone"><b>Enter phone number for search</b></label>
                <input type="text" placeholder="Enter Search Entity" name="phone" />
                
                <Link to="/home"><button>Search Flag</button></Link>
                <Link to="/home"><button>Home Page</button></Link>
            </React.Fragment>
        </div>
    );
  }
}

export default Search