import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class CutifiedURL extends Component {
    render() {
        return (
            <div class="alert alert-primary" role="alert">
                This is the cutified URL: <a href={this.props.cutifiedURL} class="alert-link"> {this.props.cutifiedURL} </a>. Give it a click if you like.
            </div>
        );
    }
}
export default CutifiedURL;