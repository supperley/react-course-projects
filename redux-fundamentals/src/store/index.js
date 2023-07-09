import { legacy_createStore } from 'redux';

const initialState = { counter: 0, isCounterInvisible: false };

const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1,
            isCounterInvisible: state.isCounterInvisible,
        };
    }

    if (action.type === 'increase') {
        return {
            counter: state.counter + action.number,
            isCounterInvisible: state.isCounterInvisible,
        };
    }

    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
            isCounterInvisible: state.isCounterInvisible,
        };
    }

    if (action.type === 'visibility') {
        return {
            counter: state.counter,
            isCounterInvisible: !state.isCounterInvisible,
        };
    }

    return state;
};

const store = legacy_createStore(counterReducer);

export default store;
