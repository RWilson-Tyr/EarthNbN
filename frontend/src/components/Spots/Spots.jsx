import { useEffect } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import "./Spots.css"

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spotsReducer.spots)

  useEffect(() => {
    const unsub = async () => {
      dispatch(spotActions.getAllSpots())
    }
    return () => {
      unsub()
    }
  }, [dispatch])

  return (
    <>
      <h1>SPOTS</h1>
      <div className="spots">
        {spots.map(spot => (
          <div key={spot.id} className="column">
            <NavLink to={`/spots/${spot.id}`}>
              <img src={`${spot.previewImage}`}></img>
              <p>{spot.city}, {spot.state} {spot.avgRating} <br></br>{spot.price} per night</p>

            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
}

export default Spots;
