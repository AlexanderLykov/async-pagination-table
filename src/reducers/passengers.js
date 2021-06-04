const initialState = {
    data: [],
    userParams: {
      page: 0,
      pageSize: 10,
      current: 1,
    },
    totalPassengers: 0,
    loading: false,
  };
  
  export default function passengers(state = initialState, action) {
    switch (action.type) {
      case "FETCH_PASSENGERS":
        return {
          ...state,
          loading: true,
        };
      case "FETCH_PASSENGERS_SUCCESS":
        return {
          ...state,
          data: action.data,
          totalPassengers: action.totalPassengers,
          loading: false,
        };
      case "FETCH_PASSENGERS_FAILURE":
        return {
          ...state,
          loading: false,
        };
      case "CHANGE_USER_PARAMS":
        return {
          ...state,
          userParams: {
            ...state.userParams,
            page: action.current - 1,
            pageSize: action.pageSize,
            current: action.current,
          },
        };
      default:
        return state;
    }
  }
  