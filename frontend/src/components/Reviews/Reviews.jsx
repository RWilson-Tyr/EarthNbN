import { useEffect } from 'react';
import * as reviewActions from '../../store/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import "./Reviews.css"

function Reviews() {
    const dispatch = useDispatch();
    // const spot = useSelector(state => state.spotsReducer)
    const reviews = useSelector(state => state.reviewsReducer.reviews.Reviews)
    // const [errors, setErrors] = useState([]);
    let getId = useParams()

    useEffect(()=> {
      const unsub = async () => {
        dispatch(reviewActions.getAllReviews(getId))
      }
      return () =>{
        unsub()
      }
    }, [dispatch])
  
    return (
      <>
      <h1>REVIEWS</h1>
       {reviews ?
      <div className="reviews">
        
      {reviews.map(review => (
          <div key={review.id} className="column">
            <span className="tooltiptext">{}</span>
            {review.review}
          </div>
        ))}
      </div>
       : <p>hello</p>}</>
      
    );
  }
  
  export default Reviews;
