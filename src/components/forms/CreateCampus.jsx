import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCampusAsync } from "../../features/campusSlice";
import { Link, useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

const CreateCampus = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [address, setAddress] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCampusAsync({ name, description, imageUrl, address }));
        navigate("/campuses");
    }

    return (
        <Form onSubmit={handleSubmit} className='form'>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter campus name" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="imageUrl">
                <Form.Label>Image</Form.Label>
                <Form.Control 
                    type="url" 
                    placeholder="Enter image url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter location" 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" style={{ margin: '1em' }}>Submit</Button>
            <Link to="/">Cancel</Link>
        </Form>
    )
}

export default CreateCampus;