import { csrfFetch } from "./csrf";

const SPOTS = "spots/getSpots";
const SINGLE_SPOT = "spots/singleSpot"
const SPOT_CREATE = "spots/spotCreate"
const CURR = "spots/getCurr"
const POST_REVIEW = 'spots/postSpotReview'

export const getSpots = (spots) => {
  return {
    type: SPOTS,
    spots
  }
};

export const getCurr = (curr) => {
  return {
    type: CURR,
    curr
  }
};

export const singleSpot = (spot) => {
  return {
    type: SINGLE_SPOT,
    spot
  }
}

export const spotCreate = (spot) => {
  return {
    type: SPOT_CREATE,
    spot
  }
}

export const postSpotReview = (review) => {
  return {
    type: POST_REVIEW,
    review
  }
} 

export const updateSpot = ({
  address,
  city,
  state,
  country,
  lat,
  lng,
  name,
  description,
  price }, spot) =>
  async (dispatch) => {
    let res = await csrfFetch(`/api/spots/${spot.spotid}`, {
      method: "PUT",
      body: JSON.stringify({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price }),
    });

    if (res.ok) {
      res = await res.json();
      dispatch(spotCreate(res));
      return res;
    }
  };

export const deleteReview = (payload) => async (dispatch) => {
  let res = await csrfFetch(`/api/reviews/${payload.reviewId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    res = await res.json()
    dispatch(getSingleSpot(payload.spotId))
    return res
  }
}

export const deleteSpot = (spotId) => async (dispatch) => {
  let res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    res = await res.json()
    dispatch(getCurr(res.Spots))
    return res
  }
}

export const postReview = (spotId, {review, stars} ) =>
async (dispatch) => {
    let spot = spotId.spotId
    let res = await csrfFetch(`/api/spots/${spot}/reviews`, {
      method: "POST",
      body: JSON.stringify({ review, stars}),
    });

    if (res.ok) {
      res = await res.json();
      dispatch(postSpotReview(res));
      return res;
    }
  };

export const getCurrent = () => async (dispatch) => {
  let res = await csrfFetch(`/api/spots/current`)

  if (res.ok) {
    res = await res.json()
    dispatch(getCurr(res.Spots))
    return res
  }
}

export const getAllSpots = () => async (dispatch) => {
  let res = await fetch(`/api/spots`)

  if (res.ok) {
    res = await res.json()
    dispatch(getSpots(res.Spots))
    return res
  }
}

export const getSingleSpot = (spotId) => async (dispatch) => {
  let res = await fetch(`/api/spots/${spotId}`)

  if (res.ok) {
    res = await res.json()
    dispatch(singleSpot(res))
    return res
  }
}

export const createSpot = ({
  address,
  city,
  state,
  country,
  lat,
  lng,
  name,
  description,
  price }) =>
  async (dispatch) => {
    let res = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price }),
    });

    if (res.ok) {
      res = await res.json();
      dispatch(spotCreate(res));
      return res;
    }
  };

const initalState = { spots: [], curr: [] }

const spotsReducer = (state = initalState, action) => {
  switch (action.type) {
    case SPOTS:
      return { ...state, spots: [...action.spots] }
    case SINGLE_SPOT:
      {
        const newState = { ...state };
        newState.spot = action.spot;
        return newState;
      }
    case SPOT_CREATE:
      {
        const newState = { ...state };
        newState.spot = action.spot;
        return newState;
      }
    case CURR: 
      {
        const newState = { ...state };
        newState.curr = action.curr;
        return newState;
      }
    case POST_REVIEW:
      {
        const newState = { ...state };
        newState.reviews = action.reviews;
        return newState;
      }
    default:
      return state
  }
}

export default spotsReducer
