import React from "react"
import * as styles from './Home.style'

class NoMatch extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    return (
        <div className="NoMatch">
            <React.Fragment>
                <label class="control-label col-sm-8" for="name"><b>Name:</b></label>
                <div class="control-label" className="row" name="name">
                    <div class="control-label" className="col-sm-8">
                        {/* {this.props.name} */}
                        Hello world, do you like animals and stuff?
                    </div>
                </div>

                <label class="control-label col-sm-8" for="location"><b>Location:</b></label>
                <div className="row" name="location">
                    <div className="col-sm-8">
                        {/* {this.props.location} */}
                        test
                    </div>
                </div>

                <label class="control-label col-sm-8" for="license_plate"><b>License Plate:</b></label>
                <div className="row" name="license_plate">
                    <div className="col-sm-8">
                        {/* {this.props.license_plate} */}
                        test
                    </div>
                </div>

                <label class="control-label col-sm-8" for="phone"><b>Phone:</b></label>
                <div className="row" name="phone">
                    <div className="col-sm-8">
                        {/* {this.props.phone} */}
                        test
                    </div>
                </div>
            </React.Fragment>
        </div>
    );
  }
}

export default NoMatch