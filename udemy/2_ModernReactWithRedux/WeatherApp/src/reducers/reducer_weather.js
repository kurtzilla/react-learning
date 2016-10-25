import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action){
  // redux-promise middleware has resolved the payload of the action
  switch(action.type){
    case FETCH_WEATHER:
      // return state.push(action.payload.data);// NO!!! Don't mutate!!!! never modify directly
      // return state.concat([action.payload.data]);//better
      return [ action.payload.data, ...state ];//ES6 - concat syntax - order counts!
  }
  return state;
}
