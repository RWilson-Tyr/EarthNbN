import { useEffect } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewModal from '../ReviewModal/ReviewModal';
import OpenModalButton from '../OpenModalButton';
import "./SpotDetail.css"
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import Reviews from '../Reviews/Reviews';
import { AiFillStar } from "react-icons/ai"

function SpotDetail() {
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spotsReducer.spot)
  const getId = useParams()
  const star = AiFillStar()

  useEffect(() => {
    const unsub = () => {
      dispatch(spotActions.getSingleSpot(getId.spotId))
    }
    return () => {
      unsub()
    }
  }, [dispatch])
  let dot = String.fromCodePoint(0x00B7)

  let isNew = spot ? spot.numReviews === 0 ? "New" : spot.numReviews === 1 ?
    dot + spot.numReviews + " review" : dot + spot.numReviews + " reviews" : ""

  let trueAvg = spot ? Math.round(spot.avgStarRating * 100) / 100 : ""


  const reserve = (e) => {
    e.preventDefault()
    alert("Feature coming Soon")
  }


  const sessionUser = useSelector(state => state.session.user);


  const checkOwner = spot && sessionUser ? (sessionUser !== null && sessionUser.id !== spot.Owner.id ? (
    <>
      <OpenModalButton
        buttonText="Post Your Review"
        modalComponent={<ReviewModal spotId={spot.id} />}

      /><OpenModalButton
        buttonText="Delete Your Review"
        modalComponent={<DeleteReviewModal spotId={spot.id} />}

      />
    </>
  ) : (<></>)) : (
    <></>
  );




  return (
    <>
      <h1>SPOTS</h1>
      {spot ? <div className="spots">
        {checkOwner}
        <div>
          <h3>{spot.name}</h3>

          {spot.SpotImages.map((img) =>
            <div key={img.id}>
              <img src={img.url}></img>
            </div>
          )}
        </div>
        <p><br></br>
          Location: {spot.city},{spot.state},{spot.country}
        </p><br></br>
        <p>Hosted by {spot.Owner.firstName}, {spot.Owner.lastName}</p><br></br>
        <p>Paragraph: {spot.description}</p>
        <div>${spot.price} night, {star}{trueAvg} {isNew}
          <button onClick={reserve}>Reserve</button>
        </div>
        <div><Reviews /></div>
      </div> : <p>loading...</p>}

    </>
  );
}

export default SpotDetail;
