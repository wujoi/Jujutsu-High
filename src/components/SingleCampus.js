import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSingleCampus, fetchSingleCampus } from "../features/singleCampusSlice";
import { useParams, Link } from "react-router-dom";
import EditCampus from './forms/EditCampus.jsx'

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { unregisterStudent } from "../features/singleStudentSlice";

const SingleCampus = () => {
    const { campusId } = useParams();
    const dispatch = useDispatch();
    
    const singleCampus = useSelector(selectSingleCampus);
    const { id, name, imageUrl, description, students } = singleCampus ?? {};

    useEffect(() => {
        dispatch(fetchSingleCampus(campusId));
    }, [dispatch, singleCampus])

    const handleUnregister = (student) => {
        console.log(student.id)
        dispatch(unregisterStudent({ id: student.id }));
        dispatch(fetchSingleCampus(campusId));
    }

    return (
        <div className="single-container">
            {id 
                ? (
                    <Card key={id} border="secondary" style={{ width: '80%' }} className='single-card'>
                        <Card.Body>
                        <Card.Img className="single campus-img" src={imageUrl} />
                        <h2>{name}</h2>
                        <Card.Text style={{ fontStyle: 'italic'}}>{description}</Card.Text>
                        <ListGroup> Enrolled Students:
                            {students && students.length
                            ? students.map((student) => {
                                return (
                                    <ListGroup.Item key={student.id} style={{ width: '100%', height: '5em', display: 'flex', }} className="enrolled-list">
                                        <img src={student.imageUrl} style={{ width: '3em', objectFit: 'cover' }}/>
                                        <Link to={`/students/${student.id}`}>
                                            <p style={{ marginLeft: '1em'}}>{student.firstName} {student.lastName}</p>
                                        </Link>
                                            <button type="button" onClick={() => handleUnregister(student)} className='unregister-button'>Unregister</button>
                                    </ListGroup.Item>
                                )
                            })
                            :   <ListGroup.Item>
                                    There are no students currently enrolled at this campus.
                                </ListGroup.Item>
                            
                            }
                        </ListGroup>
                        <br></br>
                        <h5>Update Campus Information:</h5>
                        <EditCampus />
                        </Card.Body>
                    </Card>
                )
                : (
                    <>
                        <h1 className='error-msg'>Oops this campus does not exist!</h1>
                        <img className='error-img' src={'/images/errors/campus.png'} />
                    </>
                )}
        </div>
    )
}

export default SingleCampus;