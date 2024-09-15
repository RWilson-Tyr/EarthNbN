const REVIEWS = "reviews/getReviews";

export const getReviews = (reviews) => {
  return {
    type: REVIEWS,
    reviews
  }
};

export const getAllReviews = (spotId) => async dispatch => {
    let res = await fetch(`/api/spots/${spotId.spotId}/reviews`)

    if(res.ok){
      res = await res.json()
      dispatch(getReviews(res))
      return res
    }
  }

  const initalState = {reviews: []}

  const reviewsReducer = (state = initalState, action) => {
    switch (action.type) {
      case REVIEWS:{
        const newState = { ...state };
        newState.reviews = action.reviews;
        return newState;
      }
      default:
        return state
    }
  }

  export default reviewsReducer
