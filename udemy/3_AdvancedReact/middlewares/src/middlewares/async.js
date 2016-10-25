export default function({ dispatch }){
  return next => action => {
    // if no payload or if no then property, send it on
    if(!action.payload || !action.payload.then){
      return next(action);
    }


    // make sure the action's promise resolves
    action.payload
      // .then(response => dispatch({ ...action, payload: response }));
      .then(function(response) {
        const newAction = { ...action, payload: response };
        dispatch(newAction);
      });
  };

  // equiv to
  // return function(next) {
  //   return function(action) {
  //
  //   }
  // }
}
