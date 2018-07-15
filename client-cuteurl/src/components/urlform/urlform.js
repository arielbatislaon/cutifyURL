import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import CutifiedURL from './cutified-url';
class URLForm extends Component {

    constructor() {
        super();
        this.state = {
            cutifiedURL: "",
            originalURL: ""
        };
    }

    updateURL(event) {
        this.setState({ originalURL: event.target.value });
    }

    cutify() {
        let originalUrl = this.state.originalURL;
        let urlString = 'http://localhost:5000/cut.ly';
        fetch(urlString, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify({urltoCutify: originalUrl}), // body data type must match "Content-Type" header
        }).then((response) => {
            response.json().then((data) => {
                console.log(data);
                this.setState({cutifiedURL: data.cutifiedURL});
            })
        });
    }
    render() {
        return (
            <div class="container">
                <div class="input-group mb-2">
                    <input type="text" class="form-control" placeholder="type URL here" onChange={this.updateURL.bind(this)} />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={this.cutify.bind(this)}>Cutify URL</button>
                    </div>
                </div>
                {this.state.cutifiedURL && <CutifiedURL cutifiedURL={this.state.cutifiedURL} />}
            </div>
        );
    }
}

export default URLForm;