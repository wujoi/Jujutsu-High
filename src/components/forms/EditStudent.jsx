import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleStudent, selectSingleStudent, updateStudent } from "../../features/singleStudentSlice";
import { deleteStudent } from '../../features/studentsSlice';
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchCampusAsync, selectCampus } from "../../features/campusSlice";

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { fetchSingleCampus } from "../../features/singleCampusSlice";

const EditStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { studentId } = useParams();
    const student = useSelector(selectSingleStudent);
    const campuses = useSelector(selectCampus);

    useEffect(() => {
        dispatch(fetchSingleStudent(studentId));
        dispatch(fetchCampusAsync());
    }, [dispatch])

    const [firstName, setFirstName] = useState(student.firstName);
    const [lastName, setLastName] = useState(student.lastName);
    const [imageUrl, setImageUrl] = useState(student.imageUrl);
    const [email, setEmail] = useState(student.email);
    const [gpa, setGpa] = useState(student.gpa);
    const [campus, setCampus] = useState(student.campus);

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
            dispatch(updateStudent({ id: studentId, firstName: firstName, lastName: lastName, imageUrl: imageUrl, email: email, gpa: gpa, campus: campus }));
            dispatch(fetchSingleStudent(studentId));
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteStudent({ id: studentId }));
        navigate("/students");
    }

    const handleCampusChange = async (e) => {
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
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="imageUrl">
                <Form.Label>Image</Form.Label>
                <Form.Control 
                    type="text" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="text" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="gpa">
                <Form.Label>GPA</Form.Label>
                <Form.Control 
                    type="number" 
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
            <Button type="submit" style={{ margin: '1em' }} onClick={handleSubmit}>Submit</Button>
            <Button type="button" variant="danger" onClick={handleDelete}>Delete</Button>
        </Form>
    )
}

export default EditStudent;