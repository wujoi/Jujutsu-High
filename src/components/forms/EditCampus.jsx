import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCampus, selectSingleCampus, updateCampus, deleteCampus } from "../../features/singleCampusSlice";
import { useNavigate, useParams } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

const EditCampus = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { campusId } = useParams();
    const campus = useSelector(selectSingleCampus);

    useEffect(() => {
        dispatch(fetchSingleCampus(campusId));
    }, [dispatch])

    const [name, setName] = useState(campus.name);
    const [description, setDescription] = useState(campus.description);
    const [imageUrl, setImageUrl] = useState(campus.imageUrl);
    const [address, setAddress] = useState(campus.address);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCampus({ id: campusId, name: name, description: description, imageUrl: imageUrl, address: address }));
        dispatch(fetchSingleCampus(campusId));
        navigate(`/campuses/${campusId}`);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteCampus({ id: campusId }));
        navigate("/campuses");
    }

    return (
        <Form onSubmit={handleSubmit} className='form'>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    type="text" 
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="imageUrl">
                <Form.Label>Image</Form.Label>
                <Form.Control 
                    type="url" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    type="text" 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" style={{ margin: '1em' }} onClick={handleSubmit}>Submit Updates</Button>
            <Button type="button" variant="danger" onClick={handleDelete}>Delete</Button>
        </Form>
    )
}

export default EditCampus;