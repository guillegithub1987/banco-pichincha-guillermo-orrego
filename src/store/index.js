import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemon-slice';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: { pokemon: pokemonReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
