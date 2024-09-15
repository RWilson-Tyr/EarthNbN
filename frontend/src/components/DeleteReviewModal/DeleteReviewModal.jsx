import * as spotActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteReviewModal.css';

function DeleteReviewModal(spotId, reviewId) {
  const dispatch = useDispatch();
//   const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleDelete = (e) => {
    e.preventDefault();
    // setErrors({});
    return dispatch(spotActions.deleteReview(spotId, reviewId))
      .then(closeModal)
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   })
      .then(()=>dispatch(spotActions.getSingleSpot(spotId)));
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to remove this review?</h3>

          <button className="delete" type="delete" onClick={handleDelete}><p>Yes (Delete Review)</p></button>
          <button className="close" type="close" onClick={closeModal}><p>No (Keep Review)</p></button>
    </>
  );
}

export default DeleteReviewModal;
