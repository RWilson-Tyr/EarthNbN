import { useEffect } from 'react';
import * as reviewActions from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import "./Reviews.css"

function Reviews() {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviewsReducer.reviews)
    // const [errors, setErrors] = useState([]);
    useEffect(()=> {
      const unsub = async () => {
        dispatch(reviewActions.getAllReviews())
      }
      return () =>{
        unsub()
      }
    }, [dispatch])
  
  
    return (
      <>
        <h1>REVIEWS</h1>
      <div className="reviews">
        here is reviews
      </div>
      </>
    );
  }
  
  export default Reviews;
