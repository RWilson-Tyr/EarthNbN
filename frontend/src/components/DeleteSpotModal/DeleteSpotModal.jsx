import { useState } from 'react';
import * as spotActions from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css';
import { useNavigate } from 'react-router-dom';

function DeleteSpotModal(spotId) {
  const dispatch = useDispatch();
//   const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleDelete = (e) => {
    e.preventDefault();
    // setErrors({});
    return dispatch(spotActions.deleteSpot(spotId.spotId))
      .then(closeModal)
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   })
      .then(()=>dispatch(spotActions.getCurrent()));
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to remove this spot from the listings?</h3>

          <button className="delete" type="delete" onClick={handleDelete}><p>Yes (Delete Spot)</p></button>
          <button className="close" type="close" onClick={closeModal}><p>No (Keep Spot)</p></button>
    </>
  );
}

export default DeleteSpotModal;
