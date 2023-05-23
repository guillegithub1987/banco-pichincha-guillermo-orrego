import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    pokemones: [],
    pokemonesSearch: [],
    isLoading: false,
    searchValue: '',
    modalOpen: false,
    currentPokemon: null,
    isEditing: false,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: initialState,
    reducers: {
        setPokemones(state, action) {
            state.pokemones = action.payload;
            state.pokemonesSearch = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
            state.pokemonesSearch = state.pokemones.filter((pokemon) =>
                pokemon.name.includes(action.payload)
            );
        },
        setModalOpen(state, action) {
            state.modalOpen = action.payload;
        },
        setIsEditing(state, action) {
            state.isEditing = action.payload;
        },
        setCurrentPokemon(state, action) {
            state.currentPokemon = { ...action.payload };
        },
        resetCurrentPokemon(state) {
            state.currentPokemon = null;
        },
    },
});

export const pokemonActions = pokemonSlice.actions;

export const getPokemones = () => {
    return (dispatch) => {
        dispatch(pokemonActions.setIsLoading(true));
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/?idAuthor=1',
            }).then(
                (response) => {
                    dispatch(pokemonActions.setPokemones(response.data));
                    dispatch(pokemonActions.setIsLoading(false));
                    resolve();
                },
                (error) => {
                    dispatch(pokemonActions.setIsLoading(false));
                    reject(error);
                    console.log(error);
                }
            );
        });
    };
};

export const deletePokemon = (pokemonId) => {
    return (dispatch) => {
        dispatch(pokemonActions.setIsLoading(true));
        return new Promise((resolve, reject) => {
            axios({
                method: 'DELETE',
                url: `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${pokemonId}`,
            }).then(
                () => {
                    resolve();
                },
                (error) => {
                    dispatch(pokemonActions.setIsLoading(false));
                    reject(error);
                    console.log(error);
                }
            );
        });
    };
};

export const savePokemon = (pokemonObject, edition) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios({
                method: edition ? 'PUT' : 'POST',
                url: `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${
                    edition ? pokemonObject.id : ''
                }`,
                data: pokemonObject,
            }).then(
                () => {
                    dispatch(pokemonActions.setIsEditing(false));
                    dispatch(pokemonActions.setModalOpen(false));
                    resolve();
                },
                (error) => {
                    reject(error);
                    console.log(error);
                }
            );
        });
    };
};

export default pokemonSlice.reducer;
