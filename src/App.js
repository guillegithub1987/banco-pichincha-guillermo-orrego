import Layout from './components/Layout/Layout';
import MainOptions from './components/MainOptions/MainOptions';
import PokemonList from './components/PokemonList/PokemonsList';
import ModalOverlay from './components/UI/ModalOverlay/ModalOverlay';

import { useSelector, useDispatch } from 'react-redux';
import { pokemonActions } from './store/pokemon-slice';

function App() {
    const modalOpen = useSelector((state) => state.pokemon.modalOpen);

    const dispatch = useDispatch();

    const cancelHandler = () => {
        dispatch(pokemonActions.setModalOpen(false));
        dispatch(pokemonActions.setIsEditing(true));
    };

    return (
        <Layout>
            <MainOptions />
            <PokemonList />
            {modalOpen && <ModalOverlay onCancel={cancelHandler} />}
        </Layout>
    );
}

export default App;
