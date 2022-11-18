const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
};

export const getReducer = (namespace) => (state = initialState, action) => {
  switch (action.type) {
    case `${namespace}/GET_REQUEST`: {
      return {
        ...state,
        loading: true,
        success: false,
      };
    }
    case `${namespace}/GET_SUCCESS`: {
      return {
        ...state,
        data: action.data,
        loading: false,
        success: true,
      };
    }
    case `${namespace}/GET_FAILURE`: {
      return {
        ...state,
        error: action.error,
        loading: false,
        data: [],
        success: false,
      };
    }
    case `${namespace}/GET_RESET`: {
      return {
        ...state,
        data: [],
      };
    }
    default:
      return state;
  }
};
