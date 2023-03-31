import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudentAsync } from "../../features/studentsSlice";
import { Link, useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { fetchSingleCampus } from "../../features/singleCampusSlice";
import { selectCampus, fetchCampusAsync } from "../../features/campusSlice";


const CreateStudent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [email, setEmail] = useState("");
    const [gpa, setGpa] = useState("");
    const [campus, setCampus] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const campuses = useSelector(selectCampus);

    useEffect(() => {
        dispatch(fetchCampusAsync());
    }, [dispatch])

    const isEmail = (str) => /[\w]+@[\w]+\.[a-zA-Z]{3}/.test(str);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEmail(email)){
            alert("Student must have a valid email");
            return;
        }
        if(gpa < 0 || gpa > 4.0){
            alert("Student GPA must be between 0.0-4.0");
            return;
        } 
        else {
            dispatch(addStudentAsync({ firstName, lastName, imageUrl, email, gpa, campus }));
            navigate("/students");
        }
    }

    const handleCampusChange = async (e) => {
        e.preventDefault();
        const campusId = e.target.value;
        if (campusId !== 0) {
          const data = await dispatch(fetchSingleCampus(campusId));
          setCampus(data.payload);
        } else {
          setCampus(null);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className='form'>
            <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter first name" 
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter last name" 
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter email address" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="gpa">
                <Form.Label>GPA</Form.Label>
                <Form.Control 
                    type="number" 
                    placeholder="Enter current GPA" 
                    required
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="campus">
                <Form.Label>Campus</Form.Label>
                <Form.Select
                    value={campus ? campus.id : "Not Enrolled"}
                    onChange={handleCampusChange}
                >
                    <option value={0}>Not Enrolled</option>
                    {campuses.map((campus) => {
                        return(
                            <option key={campus.id} value={campus.id}>{campus.name}</option>
                        )
                    })}
                </Form.Select>
                <p><i>If the student's campus is not listed, please add the campus <Link to='/campuses/add-campus'>HERE</Link></i></p>
            </Form.Group>
            <Button type="submit" style={{ margin: '1em' }}>Submit</Button>
            <Link to="/">Cancel</Link>
        </Form>
    )
}

export default CreateStudent;