import { useEffect, useState } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import "./ManageSpots.css"

function ManageSpot() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spotsReducer.curr)

  useEffect(() => {
    const unsub = async () => {
      dispatch(spotActions.getCurrent())
    }
    return () => {
      unsub()
    }
  }, [dispatch])

//   console.log(spots)

  return (
    <>
      <h1>Manage Your Spots</h1>
      <div >
        {/* <p>{spots ? spots : "loading"}</p> */}
        <p>manage spots here</p>
      </div>
    </>
  );
}

export default ManageSpot;
