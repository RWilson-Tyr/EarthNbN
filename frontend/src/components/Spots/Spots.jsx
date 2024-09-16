import { useEffect, useState } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./Spots.css"
// import { AiFillStar } from 'react-icons/ai';


function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spotsReducer.spots)
  const [isLoaded, setIsLoaded] = useState(false);
  // const star = AiFillStar()

  useEffect(() => {
      dispatch(spotActions.getAllSpots())
      .then(() => {
        setIsLoaded(true)})
  }, [dispatch])


  
  return (
    <>
      <div className="spots">
      {spots && isLoaded && spots.map(spot => (
  <div key={spot.id} className="spotContainer" >
            <NavLink to={`/spots/${spot.id}`} id={spot.id}>
            {/* <span className="tooltiptext">{spot.name}</span>
              <img src={`${spot.previewImage.url}`}></img>
              <p>{spot.city}, {spot.state} {star}{Math.round(spot.avgRating * 100)/100} <br></br>{spot.price} per night</p> */}
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
}

export default Spots;
