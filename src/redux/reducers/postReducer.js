const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
};

export const postReducer = (namespace) => (state = initialState, action) => {
  switch (action.type) {
    case `${namespace}/POST_REQUEST`: {
      return {
        ...state,
        loading: true,
        success: false,
      };
    }
    case `${namespace}/POST_SUCCESS`: {
      return {
        ...state,
        data: action.data,
        loading: false,
        success: true,
      };
    }
    case `${namespace}/POST_FAILURE`: {
      return {
        ...state,
        error: action.error,
        loading: false,
        data: [],
        success: false,
      };
    }
    default:
      return state;
  }
};
