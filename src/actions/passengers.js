import axios from "axios";

export const changeUserParams = (params) => (dispatch) => {
  dispatch({
    type: "CHANGE_USER_PARAMS",
    ...params,
  });
  dispatch(fetchPassengers());
};

export const fetchPassengers = () => (dispatch, getState) => {
  dispatch({ type: "FETCH_PASSENGERS" });
  const userParams = getState().passengers.userParams;
  axios
    .get(
      `https://api.instantwebtools.net/v1/passenger?page=${userParams.page}&size=${userParams.pageSize}`
    )
    .then(({ data }) => {
      dispatch({
        type: "FETCH_PASSENGERS_SUCCESS",
        totalPassengers: data.totalPassengers,
        data: data.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "FETCH_PASSENGERS_FAILURE",
      });
    });
};
