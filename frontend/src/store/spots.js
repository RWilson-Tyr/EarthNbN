import { csrfFetch } from "./csrf";

const SPOTS = "spots/getSpots";
const SINGLE_SPOT = "spots/singleSpot"
const SPOT_CREATE = "spots/spotCreate"
const CURR = "spots/getCurr"

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

export const getCurrent = () => async dispatch => {
  let res = await fetch(`/api/spots/current`)

  if (res.ok) {
    res = await res.json()
    console.log("RES",res.Spots)
    dispatch(getCurr(res))
    return res
  }
}

export const getAllSpots = () => async dispatch => {
  let res = await fetch(`/api/spots`)

  if (res.ok) {
    res = await res.json()
    dispatch(getSpots(res.Spots))
    return res
  }
}

export const getSingleSpot = (spotId) => async dispatch => {
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

const initalState = { spots: [] }

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
    default:
      return state
  }
}

export default spotsReducer
