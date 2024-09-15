import { useEffect} from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate} from 'react-router-dom';
import "./ManageSpots.css"
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import OpenModalButton from '../OpenModalButton';


function ManageSpot() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spotsReducer.curr)
  let navigate = useNavigate()

  useEffect(() => {
    const unsub = async () => {
      dispatch(spotActions.getCurrent())
    }
    return () => {
      unsub()
    }
  }, [dispatch])

  let findSpots = (
    spots.map(spot => (
      <div key={spot.id} className="spotContainer">
          <NavLink to={`/spots/${spot.id}`}>
          <span className="tooltiptext">{spot.name}</span>
            <img src={`${spot.SpotImages[0].url}`}></img>
          </NavLink>
            <p>{spot.city}, {spot.state} {spot.avgRating} <br></br>{spot.price} per night</p>
          <button onClick={()=>navigate(`/spots/${spot.id}/edit`)}>Update</button>
          <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeleteSpotModal spotId={spot.id} />}
      />
        </div>
      ))
  )

  return (
    <>
      <h1>Manage Your Spots</h1>
    {spots ? <div className="spots">
      {spots ? findSpots : ""}
      </div> :  <div>
        <button onClick={navigate(`/spots/new`)}></button>
        </div>}
      
    </>
  );
}

export default ManageSpot;
