import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import AllCampus from './AllCampus';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import HomePage from './HomePage';
import PageNotFound from './PageNotFound';
import Gojou from './Gojou';

import CreateCampus from './forms/CreateCampus.jsx';
import EditCampus from './forms/EditCampus.jsx';
import CreateStudent from './forms/CreateStudent.jsx';
import EditStudent from './forms/EditStudent.jsx';

const Main = () => {
    const location = useLocation();

    return (
        <div className='main'>
            <nav>
            <Link to="/">Home</Link>
            <Link to="/campuses">Campuses</Link>
            <Link to="/students">Students</Link>
            {location.pathname === '/' ? null :
                location.pathname === '/campuses' ?
                <Link className='create-link' to="/campuses/add-campus">Create New Campus</Link> :
                <Link className='create-link' to="/students/add-student">Create New Student</Link>
            }
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/campuses" element={<AllCampus />} />
                <Route path="/campuses/:campusId" element={<SingleCampus />} />
                <Route path="/campuses/add-campus" element={<CreateCampus />} />
                <Route path="/campuses/edit-campus/:campusId" element={<EditCampus />} />
                <Route path="/students" element={<AllStudents />} />
                <Route path="/students/:studentId" element={<SingleStudent />} />
                <Route path="/students/add-student" element={<CreateStudent />} />
                <Route path="/students/edit-student/:studentId" element={<EditStudent />} />
                <Route path="/gojou" element={<Gojou />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
};

export default Main;
