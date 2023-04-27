import React, { Component } from 'react';
import axios from "axios";
import "./Approval.css"
import "../MainPage.css";

class ApprovalPage extends Component {
    state = {
        image : null,
        imageId : null,
        imageUrl : null,
    }

    fetchImage = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/image/unapproved`);

            let image = response.data.image[0];
            if (image === undefined) {
                console.log('no image')
                this.setState({
                    image : null,
                    imageId : null,
                    imageUrl : null
                })
                return;
            }            
            this.setState({
                image : image,
                imageId : image._id,
                imageUrl : image.imageURL
            })
        } catch (err) {
            console.log(err);
        }
    }

    handleDelete = async (e) => {
        try {
            console.log(this.state.imageId)
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_ENDPOINT}/image/${this.state.imageId}`);

            if (response.status === 200) {
                this.fetchImage();           
            }
        } catch (err) {
            console.log(err);
        }
    }

    handleApprove = async (e) => {
        try {
            console.log(this.state.imageId)
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/image/${this.state.imageId}/approve`);
          
            if (response.status === 200) {
                this.fetchImage();           
            }
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
                {
                    this.state.imageUrl != null ?
                    <div>
                        <img id="approval-image" src={this.state.imageUrl} alt="" />
                        <div id="approval-buttons-container">
                            <button className="approve-button" onClick={this.handleApprove}>
                                Approve
                            </button>
                            <button className="delete-button" onClick={this.handleDelete}>
                                Delete Image
                            </button>
                        </div>
                    </div>
                    :
                    <h1 id="no-images">No images to be approved</h1>
                }

            </div>
        );
    }
}

export default ApprovalPage