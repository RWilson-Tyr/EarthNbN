import { useState } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './ReviewModal.css';

function ReviewModal(spotId) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(spotActions.postReview(spotId, { review, stars }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  
  let checkCondition = () => {
    if(review.length >= 10 && (stars > 0 && stars < 6)){return false}
    else {return true}
  }
  let condition = checkCondition()

  return (
    <>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            placeholder='Leave your review here...'
          />
        </label>
        <label>
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            max="5"
            min="1"
            required
            placeholder='Input the amout of stars (1-5)'
          />
        </label>
        {/* {errors.xxxx && (
          <p>{errors.xxxx}</p>
        )} */}
        <button disabled={condition} type="submit">Submit Your Review</button>
      </form>
    </>
  );
}

export default ReviewModal;
