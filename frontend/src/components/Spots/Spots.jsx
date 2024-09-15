import { useEffect } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Spots.css"
import { AiFillStar } from 'react-icons/ai';


function Spots() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spotsReducer.spots)
  const star = AiFillStar()

  useEffect(() => {
    const unsub = async () => {
      dispatch(spotActions.getAllSpots())
    }
    return () => {
      unsub()
    }
  }, [dispatch])

let findSpots = (spots.map(spot => (
          <div key={spot.id} className="spotContainer">
            <NavLink to={`/spots/${spot.id}`}>
            <span className="tooltiptext">{spot.name}</span>
              <img src={`${spot.previewImage.url}`}></img>
            </NavLink>
              <p>{spot.city}, {spot.state} {star}{Math.round(spot.avgRating * 100)/100} <br></br>{spot.price} per night</p>
          </div>
        )))
  

  return (
    <>
      <div className="spots">
        {spots ? findSpots : ""}
        <button onClick={()=>navigate('/current')}>Manage</button>
      </div>
    </>
  );
}

export default Spots;
