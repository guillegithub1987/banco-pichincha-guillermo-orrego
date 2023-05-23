import { render, screen } from '../../test-utils/testing-library-utils';
import PokemonList from './PokemonsList';

describe('PokemonList component', () => {
    
    it('Render 3 pokemones provided by msw', async () => {
        render(<PokemonList />);

        // find delete icons of the rendered pokemons
         const pokemonDeleteIcons = await screen.findAllByRole('img', {
            name: /Delete$/i,
        });
        expect(pokemonDeleteIcons).toHaveLength(3);
    })
})