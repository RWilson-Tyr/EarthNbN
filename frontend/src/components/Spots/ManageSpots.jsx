import { useEffect, useState} from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate} from 'react-router-dom';
import "./ManageSpots.css"
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import OpenModalButton from '../OpenModalButton';


function ManageSpot() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const spots = useSelector(state => state.spotsReducer.curr)
  // const user = useSelector(state=> state.session.user)
  let navigate = useNavigate()

  useEffect(() => {
      dispatch(spotActions.getCurrent())
      .then(() => {setIsLoaded(true)})
  }, [dispatch])

  const handleNav = () => {
    navigate(`/spots/new`)
  }


//   if(spots){
//     let spotImg = spot.SpotImages[0].url
// }
  // let findSpots = (
  //   spots.map(spot => (
  //     <div key={spot.id} className="spotContainer">
  //         <NavLink to={`/spots/${spot.id}`}>
  //         <span className="tooltiptext">{spot.name}</span>
  //           <img src={spot.SpotImages[0].url}></img>
  //         </NavLink>
  //           <p>{spot.city}, {spot.state} {spot.avgRating} <br></br>{spot.price} per night</p>
  //         <button onClick={()=>navigate(`/spots/${spot.id}/edit`)}>Update</button>
  //         <OpenModalButton
  //       buttonText="Delete"
  //       modalComponent={<DeleteSpotModal spotId={spot.id} />}
  //     />
  //       </div>
  //     ))
  // )

  return (
    <>
      <h1>Manage Your Spots</h1>
     <div className="spots">
      {isLoaded && spots.map(spot => (
      <div key={spot.id} className="spotContainer">
          <NavLink to={`/spots/${spot.id}`}>
          <span className="tooltiptext">{spot.name}</span>
            <img src={spot.SpotImages[0].url}></img>
          </NavLink>
            <p>{spot.city}, {spot.state} {spot.avgRating} <br></br>{spot.price} per night</p>
          <button onClick={()=>navigate(`/spots/${spot.id}/edit`)}>Update</button>
          <OpenModalButton
        buttonText="Delete"
        modalComponent={<DeleteSpotModal spotId={spot.id} />}
      />
        </div>
      ))}
      </div><div>
        <button onClick={handleNav}>Create a Spot</button>
        </div>
      
    </>
  )




// if(spots && user){
//   console.log(spots.length)
//   return (
//     <>
//       <h1>Manage Your Spots</h1>
//      <div className="spots">
//       {findSpots}
//       </div><div>
//         <button onClick={handleNav}>Create a Spot</button>
//         </div>
      
//     </>
//   );} else {
//     return (<p>...loading</p>)
//   }
}

export default ManageSpot;
