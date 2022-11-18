const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
};

export const putReducer = (namespace) => (state = initialState, action) => {
  switch (action.type) {
    case `${namespace}/PUT_REQUEST`: {
      return {
        ...state,
        loading: true,
        error: null,
        failure: false,
        reset: false,
        success: false,
      };
    }
    case `${namespace}/PUT_SUCCESS`: {
      return {
        ...state,
        data: action.data,
        loading: false,
        success: true,
        failure: false,
        reset: false,
      };
    }
    case `${namespace}/PUT_FAILURE`: {
      return {
        ...state,
        error: action.error,
        loading: false,
        data: [],
        success: false,
        failure: true,
        reset: false,
      };
    }
    default:
      return state;
  }
};
