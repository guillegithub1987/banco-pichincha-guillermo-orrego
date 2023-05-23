import classes from './PokemonCard.module.scss';

import { useDispatch } from 'react-redux';
import {
    pokemonActions,
    deletePokemon,
    getPokemones,
} from '../../store/pokemon-slice';

const PokemonCard = ({ pokemon }) => {
    const dispatch = useDispatch();

    const deletePokemonHandler = () => {
        dispatch(deletePokemon(pokemon.id)).then(() =>
            dispatch(getPokemones())
        );
    };

    const editPokemonHandler = () => {
        dispatch(pokemonActions.setModalOpen(true));
        dispatch(pokemonActions.setIsEditing(true));
        dispatch(pokemonActions.setCurrentPokemon(pokemon));
    };

    return (
        <section className={classes.pokemon}>
            <div className={classes.pokemon__item}>
                <h1 className={classes['pokemon__item--label']}>
                    {pokemon.name}
                </h1>
            </div>
            <div className={classes.pokemon__item}>
                <img
                    className={classes['pokemon__item--image']}
                    src={pokemon.image}
                    alt={pokemon.name}
                />
            </div>
            <div className={classes.pokemon__item}>
                <h1 className={classes['pokemon__item--label']}>
                    {pokemon.attack}
                </h1>
            </div>
            <div className={classes.pokemon__item}>
                <h1 className={classes['pokemon__item--label']}>
                    {pokemon.defense}
                </h1>
            </div>
            <div className={classes.pokemon__item}>
                <div className={classes['pokemon__item--actions']}>
                    <img
                        className={classes.action}
                        src={require('../../assets/icons/pencil.svg').default}
                        alt="Edit"
                        title="Edit"
                        onClick={editPokemonHandler}
                    />
                    <img
                        className={classes.action}
                        src={require('../../assets/icons/bin.svg').default}
                        alt="Delete"
                        title="Delete"
                        onClick={deletePokemonHandler}
                    />
                </div>
            </div>
        </section>
    );
};

export default PokemonCard;
