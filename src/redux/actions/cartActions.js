
function add(data) {
    return {
      type: "ADD_TO_CART",
      data,
    };
  }
  function remove(data) {
    return {
      type: "REMOVE_FROM_CART",
      data,
    };
  }
  function removeAll() {
    return {
      type: "REMOVE_ALL_FROM_CART",
    };
  }


export function cartActions(data, type) {
  return dispatch => {
    if(type==="add"){
      dispatch(add(data));
    } else if(type==="remove"){
      dispatch(remove(data));
    } else if(type==="removeAll"){
      dispatch(removeAll());
    }
  };
}
