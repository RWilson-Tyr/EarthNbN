const REVIEWS = "reviews/getReviews";

export const getReviews = (reviews) => {
  return {
    type: REVIEWS,
    reviews
  }
};

export const getAllReviews = (spotId) => async dispatch => {
  console.log("RES", spotId.spotId)
    let res = await fetch(`/api/spots/${spotId.spotId}/reviews`)

    if(res.ok){
      res = await res.json()
      dispatch(getReviews(res))
      return res
    }
  }

  const initalState = {reviews: []}

  const reviewsReducer = (state = initalState, action) => {
    console.log("REVIEW ACTION", action)
    switch (action.type) {
      case REVIEWS:{
        console.log("REVIEWS ACTION", action)
        const newState = { ...state };
        newState.reviews = action.reviews;
        return newState;
      }
      default:
        return state
    }
  }

  export default reviewsReducer
