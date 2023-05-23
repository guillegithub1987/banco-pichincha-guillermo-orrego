import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './PokemonsList.module.scss';
import PokemonCard from '../PokemonCard/PokemonCard';

import { getPokemones } from '../../store/pokemon-slice';

const PokemonList = () => {
    const pokemones = useSelector((state) => state.pokemon.pokemonesSearch);
    const isLoading = useSelector((state) => state.pokemon.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemones());
    }, [dispatch]);

    return (
        <Fragment>
            {isLoading && <h1>Loading.....</h1>}
            {!isLoading && (
                <section className={classes.container}>
                    <section className={classes.header}>
                        <div className={classes.header__item}>
                            <h1 className={classes['header__item--label']}>
                                Nombre
                            </h1>
                        </div>
                        <div className={classes.header__item}>
                            <h1 className={classes['header__item--label']}>
                                Imagen
                            </h1>
                        </div>
                        <div className={classes.header__item}>
                            <h1 className={classes['header__item--label']}>
                                Ataque
                            </h1>
                        </div>
                        <div className={classes.header__item}>
                            <h1 className={classes['header__item--label']}>
                                Defensa
                            </h1>
                        </div>
                        <div className={classes.header__item}>
                            <h1 className={classes['header__item--label']}>
                                Acciones
                            </h1>
                        </div>
                    </section>
                    {pokemones.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </section>
            )}
        </Fragment>
    );
};

export default PokemonList;
