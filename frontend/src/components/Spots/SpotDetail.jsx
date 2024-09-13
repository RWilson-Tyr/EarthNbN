import { useEffect, useState } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewModal from '../ReviewModal/ReviewModal';
import OpenModalButton from '../OpenModalButton';
import "./SpotDetail.css"
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import Reviews from '../Reviews/Reviews';

function SpotDetail() {
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spotsReducer.spot)
  const getId = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const unsub =() => {
      dispatch(spotActions.getSingleSpot(getId.spotId))
      // dispatch(getAllReviews(getId))
    }
    return () => {
      unsub()
    }
  }, [dispatch])
  let dot = String.fromCodePoint(0x00B7)

  let isNew = spot ? spot.numReviews === 0 ? "New" : spot.numReviews === 1 ? 
   dot + spot.numReviews + " review" :  dot + spot.numReviews + " reviews" : ""

  //
  //check if should be useContext()
  //
  console.log(spot)

  return (
    <>
    <h1>SPOTS</h1>
    {spot ?       <div className="spots">
        <h3>{spot.name}</h3>
        <OpenModalButton
          buttonText="Post Your Review"
          modalComponent={<ReviewModal spotId={spot.id}/>}
          
        /><OpenModalButton
        buttonText="Delete Your Review"
        modalComponent={<DeleteReviewModal spotId={spot.id}/>}
        
      />
      <p><br></br>
        Location: {spot.city},{spot.state},{spot.country}
      </p><br></br>
      <p>Hosted by {spot.Owner.firstName}, {spot.Owner.lastName}</p><br></br>
      <p>Paragraph: {spot.description}</p>
      <div>${spot.price} night, {spot.avgStarRating} {isNew}</div>
          <button onClick={()=>navigate('/')}>Go Home</button>
        <div><Reviews /></div>
      </div> : <p>loading...</p> }

    </>
  );
}

export default SpotDetail;
