import { Fragment, useState } from 'react';
import Button from '../UI/Button/Button';
import { useDispatch } from 'react-redux';

import classes from './MainOptions.module.scss';

import { pokemonActions } from '../../store/pokemon-slice';

const MainOptions = () => {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    const clickButtonHandler = () => {
        dispatch(pokemonActions.resetCurrentPokemon());
        dispatch(pokemonActions.setModalOpen(true));
        dispatch(pokemonActions.setIsEditing(true));
    };

    const searchValueChangeHandler = (event) => {
        setSearchValue(event.target.value);
        dispatch(pokemonActions.setSearchValue(event.target.value));
    };
    return (
        <Fragment>
            <h1 className={classes.title}>Listado de Pokemones</h1>
            <section className={classes.mainContainer}>
                <input
                    type='text'
                    placeholder='Buscar'
                    value={searchValue}
                    onChange={searchValueChangeHandler}
                />
                <Button onClick={clickButtonHandler}>Nuevo</Button>
            </section>
        </Fragment>
    );
};

export default MainOptions;
