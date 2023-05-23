import { render, screen } from '../../test-utils/testing-library-utils';
import PokemonCard from './PokemonCard';

describe('PokemonCard component', () => {
    beforeEach(() => {
        const pokemon = {
            id: 191,
            name: 'rattata',
            image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png',
            attack: 84,
            defense: 86,
            hp: 51,
            type: 'Original',
            idAuthor: 1,
        };
        render(<PokemonCard pokemon={pokemon} />);
    });

    it('Initial render', async () => {
        // find image of the rendered pokemon
        const pokemonImage = await screen.findAllByRole('img', {
            name: /rattata$/i,
        });
        expect(pokemonImage).toHaveLength(1);
    });

    it('Render all action icons', async () => {
        // find edit icon
        const editAction = await screen.findAllByRole('img', {
            name: /Edit$/i,
        });
        expect(editAction).toHaveLength(1);
        // find delete icon
        const deleteAction = await screen.findAllByRole('img', {
            name: /Delete$/i,
        });
        expect(deleteAction).toHaveLength(1);
    });
});
