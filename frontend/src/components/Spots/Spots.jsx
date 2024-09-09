import { useEffect } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import "./Spots.css"

function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spotsReducer.spots)
    // const [errors, setErrors] = useState([]);
    useEffect(()=> {
      const unsub = async () => {
        dispatch(spotActions.getAllSpots())
      }
      return () =>{
        unsub()
      }
    }, [dispatch])
  
  
    return (
      <>
        <h1>SPOTS</h1>
      <div className="spots">
          {spots.map(spot => (
            // <div className='row'>
            <div key={spot.id} className="column">
              <NavLink to={`/api/${spot.id}`}>
                <img src={`${spot.previewImage}`}></img>
                <p>{spot.city}, {spot.state} {spot.avgRating} <br></br>{spot.price} per night</p>
                
              </NavLink>              
            </div>
            // </div>
          ))}
      </div>
      </>
    );
  }
  
  export default Spots;
