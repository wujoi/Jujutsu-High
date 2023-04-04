import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectStudents, fetchStudentsAsync, fetchFilteredStudents, fetchSortedStudents, deleteStudent } from "../features/studentsSlice";
import { Link, useNavigate } from 'react-router-dom';
import { selectCampus } from "../features/campusSlice";

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const AllStudents = () => {
    const dispatch = useDispatch();
    const students = useSelector(selectStudents);
    const navigate = useNavigate();
    const campuses = useSelector(selectCampus);
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        dispatch(fetchStudentsAsync());
    }, [dispatch])

    const handleFilter = (event) => {
        const filterValue = event;
        setFilter(filterValue);
        if (filterValue === 'all') {
          dispatch(fetchStudentsAsync());
        } else {
          dispatch(fetchFilteredStudents(filterValue));
        }
    }
      
    const handleSort = (event) => {
        const sortValue = event;
        dispatch(fetchSortedStudents(sortValue));
    }

    const handleDelete = async (student) => {
        await dispatch(deleteStudent({ id: student.id }));
        if (filter === 'all') {
            dispatch(fetchStudentsAsync());
        } else {
            dispatch(fetchFilteredStudents(filter));
        }
        navigate('/students');
    };

  return (
        <div className='parent-container'>
            <div className='drop-down-container'>
            <Dropdown className="drop-down" onSelect={handleFilter}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="all">All Students</Dropdown.Item>
                    {campuses.map((campus) => {
                    return (
                        <Dropdown.Item key={campus.id} eventKey={campus.id}>
                        Enrolled at {campus.name}
                        </Dropdown.Item>
                    );
                    })}
                    <Dropdown.Item eventKey={null}>Not Enrolled</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="drop-down" onSelect={handleSort}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="firstName">First Name</Dropdown.Item>
                    <Dropdown.Item eventKey="lastName">Last Name</Dropdown.Item>
                    <Dropdown.Item eventKey="gpa">GPA</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
            <CardGroup>
                {students && students.length
                ? (students.map((student) => {
                    return(
                        <div key={student.id} className='container' style={{ width: '12rem', height: '15rem' }}>
                            <button type="button" onClick={() => handleDelete(student)} className='delete-button'>X</button>
                            <Card key={student.id} border="secondary" style={{ width: '9rem', height: '13rem' }}>
                                <Card.Img className='student-img' src={student.imageUrl} style={{ objectFit: 'cover', height: '9rem' }}/>
                                <Card.Title>
                                    <Link to={`/students/${student.id}`} key={student.id}>{student.firstName} {student.lastName}</Link>
                                </Card.Title>
                            </Card>
                        </div>
                    )
                }))
                : (
                    <>
                    <h1 className='error-msg'>Oops there are no students here! Try changing the filter or <Link to='/students/add-student'>create a new student</Link>.</h1>
                    <img className='error-img' src={'/images/errors/no-students.png'} />
                    </>
                )}
            </CardGroup>
        </div>
    );
};

export default AllStudents;