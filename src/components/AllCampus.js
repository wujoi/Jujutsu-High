import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCampus, fetchCampusAsync } from "../features/campusSlice";
import { Link, useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import { deleteCampus } from "../features/singleCampusSlice";

const AllCampus = () => {
  const dispatch = useDispatch();
  const campuses = useSelector(selectCampus);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCampusAsync());
  }, [dispatch, campuses])

  return (
    <div className='parent-container'>
        {campuses.map((campus) => {
          function handleDelete(campus) {
            dispatch(deleteCampus({ id: campus.id }));
            dispatch(fetchCampusAsync());
            navigate('/campuses');
          }
          return(
            <div key={campus.id} className='container' style={{ width: '35rem', height: '25rem' }}>
              <button type="button" onClick={() => handleDelete(campus)} className='delete-button delete-campus'>X</button>
              <Card key={campus.id} style={{ width: '30rem', height: '23rem' }} border="secondary">
                    <Card.Img className='campus-img' src={campus.imageUrl} style={{ width: '30rem' }}/>
                    <Card.Title>
                      <Link to={`/campuses/${campus.id}`} key={campus.id}>{campus.name}</Link>
                    </Card.Title>
                    <Card.Subtitle>{campus.address}</Card.Subtitle>
              </Card>
            </div>
          )
        })}
    </div>
  );
};

export default AllCampus;