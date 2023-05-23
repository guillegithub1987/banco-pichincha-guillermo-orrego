import Button from '../UI/Button/Button';
import classes from './PokemonForm.module.scss';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { savePokemon, getPokemones } from '../../store/pokemon-slice';

const PokemonForm = (props) => {
    const currentPokemon = useSelector((state) => state.pokemon.currentPokemon);

    const dispatch = useDispatch();

    const [enteredName, setEnteredName] = useState(
        currentPokemon ? currentPokemon.name : ''
    );
    const [enteredUrl, setEnteredUrl] = useState(
        currentPokemon ? currentPokemon.image : ''
    );
    const [enteredAttack, setEnteredAttack] = useState(
        currentPokemon ? currentPokemon.attack : 0
    );
    const [enteredDefense, setEnteredDefense] = useState(
        currentPokemon ? currentPokemon.defense : 0
    );
    const [validationEnabled, setValidationEnabled] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        setValidationEnabled(true);

        if (enteredName) {
            let pokemonForm = {};
            const pokemonTemp = {
                name: enteredName,
                image: enteredUrl,
                attack: +enteredAttack,
                defense: +enteredDefense,
                idAuthor: 1,
            };

            if (currentPokemon) {
                pokemonForm = Object.assign({ ...currentPokemon }, pokemonTemp);
                dispatch(savePokemon(pokemonForm, true)).then(() => dispatch(getPokemones()));
            } else {
                pokemonForm = pokemonTemp;
                dispatch(savePokemon(pokemonForm, false)).then(() => dispatch(getPokemones()));
            }
        }
    };

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const urlChangeHandler = (event) => {
        setEnteredUrl(event.target.value);
    };

    const attackChangeHandler = (event) => {
        setEnteredAttack(event.target.value);
    };

    const defenseChangeHandler = (event) => {
        setEnteredDefense(event.target.value);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <h1 className={classes.form__title}>{props.title}</h1>
            <section className={classes.form__controls}>
                <div className={classes['form__controls--column']}>
                    <div className={classes.control}>
                        <label>Nombre: </label>
                        <input
                            className={
                                validationEnabled && !enteredName
                                    ? classes.requiredEmpty
                                    : ''
                            }
                            type="text"
                            value={enteredName}
                            aria-label='name'
                            onChange={nameChangeHandler}
                        />
                    </div>
                    <div className={classes.control}>
                        <label>Imagen: </label>
                        <input
                            type="text"
                            placeholder="url"
                            aria-label='url'
                            value={enteredUrl}
                            onChange={urlChangeHandler}
                        />
                    </div>
                </div>
                <div className={classes['form__controls--column']}>
                    <div className={classes.control}>
                        <label>Ataque: ({enteredAttack})</label>
                        <input
                            type="range"
                            value={enteredAttack}
                            min={0}
                            max={100}
                            onChange={attackChangeHandler}
                        />
                    </div>
                    <div className={classes.control}>
                        <label>Defensa: ({enteredDefense})</label>
                        <input
                            type="range"
                            value={enteredDefense}
                            min={0}
                            max={100}
                            onChange={defenseChangeHandler}
                        />
                    </div>
                </div>
            </section>
            <div className={classes.form__actions}>
                <Button type="submit">Guardar</Button>
                <Button onClick={props.onCancel}>Cancelar</Button>
            </div>
        </form>
    );
};

export default PokemonForm;
