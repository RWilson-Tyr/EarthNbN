import { useState } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './ReviewModal.css';

function ReviewModal(spotId) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("Leave your review here...");
  const [stars, setStars] = useState(3);
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
          />
        </label>
        <label>
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
        {/* {errors.xxxx && (
          <p>{errors.xxxx}</p>
        )} */}
        <button type="submit">Submit Your Review</button>
      </form>
    </>
  );
}

export default ReviewModal;
