import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSingleStudent, fetchSingleStudent } from "../features/singleStudentSlice";
import { useParams, Link } from 'react-router-dom';
import EditStudent from './forms/EditStudent.jsx'

import Card from 'react-bootstrap/Card';

const SingleStudent = () => {
    const { studentId } = useParams();
    const dispatch = useDispatch();

    const singleStudent = useSelector(selectSingleStudent);
    const { id, firstName, lastName, imageUrl, email, gpa, campus } = singleStudent ?? {};

    useEffect(() => {
        dispatch(fetchSingleStudent(studentId));
    }, [dispatch])

    return (
        <div className="single-container">
            {id
                ? (
                    <Card key={id} border="secondary" style={{ width: '38rem' }} className='single-card'>
                        <Card.Img 
                            className='single student-img' 
                            src={imageUrl} 
                            style={{ 
                                objectFit: 'cover', 
                                maxWidth: '20rem', 
                                maxHeight: '30rem',
                                display: 'flex',
                                justifyContent: 'center',
                                margin: 'auto',
                            }}
                        />
                        <Card.Body>
                            <h2>{firstName} {lastName}</h2> 
                            <Card.Text>
                                {campus 
                                    ? <span>Campus: <Link to={`/campuses/${campus.id}`} style={{ textDecoration: 'none '}}>{campus.name}</Link></span>
                                    : <span><i>This student is not enrolled at a specific campus.</i></span>
                                }
                            </Card.Text>
                            <Card.Text>
                                <span>Email: <i>{email}</i></span>
                            </Card.Text>
                            <Card.Text>
                                <span>GPA: {gpa}</span>
                            </Card.Text>
                            <br></br>
                            <h5>Update Student Information:</h5>
                            <EditStudent />
                        </Card.Body>
                    </Card>
                )
                : (
                    <>
                    <h1 className='error-msg'>Oops this student does not exist!</h1>
                    <img className='error-img' src={'/images/errors/student.png'} />
                    </>
                )}
        </div>
    )
}

export default SingleStudent;