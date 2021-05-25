import { createStore, combineReducers, applyMiddleware } from "redux";
import keplerGlReducer, {mapStateUpdaters} from "kepler.gl/reducers";
import {taskMiddleware} from "react-palm/tasks";
import rotateReducer from "./reducers/rotateReducer";

// function configureStore(state = { rotating: true }) {
//     return createStore(rotateReducer,state);
// }
// export default createStore(keplerGlReducer, {}, applyMiddleware(taskMiddleware));

const reducer = combineReducers({
    // kepler.gl reducer
    keplerGl: keplerGlReducer,
    // And any other existing reducers
    rotateReducer
});

const composedReducer = (state, action) => {
    switch (action.type) {
        case 'updateMap':
            return {
                ...state,
                keplerGl: {
                    ...state.keplerGl,
                    map: {
                        ...state.keplerGl.map,
                        mapState: mapStateUpdaters.updateMapUpdater(
                             state.keplerGl.map.mapState, action
                        )
                    }
                }
            };
        default:
            console.log("default")
            break
    }
    return reducer(state, action);
};

const store = createStore(composedReducer, {}, applyMiddleware(taskMiddleware));
export default store;