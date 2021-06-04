import { passengerService } from "../../API/services";
import {
  CHANGE_USER_PARAMS,
  FETCH_PASSENGERS,
  FETCH_PASSENGERS_SUCCESS,
  FETCH_PASSENGERS_FAILURE,
} from "../actionTypes";

export const changeUserParams = (params) => (dispatch) => {
  dispatch({
    type: CHANGE_USER_PARAMS,
    ...params,
  });
  dispatch(fetchPassengers());
};

export const fetchPassengers = () => async (dispatch, getState) => {
  const userParams = getState().passengers.userParams;
  const { page, pageSize } = userParams;

  dispatch({ type: FETCH_PASSENGERS });
  try {
    const response = await passengerService.fetch(page, pageSize);
    const { data } = response;
    dispatch({
      type: FETCH_PASSENGERS_SUCCESS,
      totalPassengers: data.totalPassengers,
      data: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PASSENGERS_FAILURE,
    });
  }
};
