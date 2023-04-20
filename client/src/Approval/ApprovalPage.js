import React, { Component } from 'react';
import axios from "axios";
import "./Approval.css"
import "../MainPage.css";

class ApprovalPage extends Component {
    state = {
        image : null,
        imageUrl : null,
    }

    fetchImage = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/image/unapproved`);

            let image = response.data.image[0];
            if (image === undefined) {
                console.log('no image')
                return;
            }            
            this.setState({
                image : image,
                imageUrl : image.imageURL
            })
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.fetchImage()
    }
    render() {
        return (
            <div className='approval-page-container'>
                <img id="approval-image" src={this.state.imageUrl} alt="" />
                <div id="approval-buttons-container">
                    <button className="approve-button" onClick={this.handleReport}>
                        Approve
                    </button>
                    <button className="delete-button" onClick={this.handleReport}>
                        Delete Image
                    </button>
                </div>
            </div>
        );
    }
}

export default ApprovalPage