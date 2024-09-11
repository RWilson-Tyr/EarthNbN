import { useEffect, useState } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import "./Spots.css"

function SpotDetail() {
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spotsReducer.spot)
  const getId = useParams()

  useEffect(() => {
    const unsub = async () => {
      dispatch(spotActions.getSingleSpot(getId.spotId))
    }
    return () => {
      unsub()
    }
  }, [dispatch])

  return (
    <>
      <h1>SPOTS</h1>
      <div className="spots">
        {/*At this point we are getting the information back
        it just needs to be formatted and lined with css*/}

          {spot ? spot.address : "...loading..."}
      </div>
    </>
  );
}

export default SpotDetail;
