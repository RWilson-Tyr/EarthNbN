const SPOTS = "spots/getSpots";

export const getSpots = (spots) => {
  return {
    type: SPOTS,
    spots
  }
};

export const getAllSpots = () => async dispatch => {
    let res = await fetch("../../../api/spots")

    if(res.ok){
      res = await res.json()
      console.log("RES", res.Spots)
      dispatch(getSpots(res.Spots))
      return res
    }
  }

  const initalState = {spots: [], isLoading: true}

  const spotsReducer = (state = initalState, action) => {
    switch (action.type) {
      case SPOTS:
        return {...state, spots: [...action.spots]}
    
      default:
        return state
    }
  }

  export default spotsReducer
