const REVIEWS = "reviews/getReviews";

export const getReviews = (reviews) => {
  return {
    type: REVIEWS,
    reviews
  }
};

export const getAllReviews = () => async dispatch => {
    let res = await fetch("../../../api/reviews")

    if(res.ok){
      res = await res.json()
      console.log("RES", res)
      dispatch(getReviews(res))
      return res
    }
  }

  const initalState = {reviews: [], isLoading: true}

  const reviewsReducer = (state = initalState, action) => {
    switch (action.type) {
      case REVIEWS:
        return {...state, reviews: [...action.reviews]}
    
      default:
        return state
    }
  }

  export default reviewsReducer
