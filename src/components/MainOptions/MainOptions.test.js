import { render, screen } from '../../test-utils/testing-library-utils';
import MainOptions from './MainOptions';

describe('Main options component', () => {
    it('Initial render', () => {
        render(<MainOptions />);

        const titleLabel = screen.getByText(/Listado de Pokemones/i);

        expect(titleLabel).toBeInTheDocument();

        const searchInput = screen.getByPlaceholderText('Buscar');

        expect(searchInput).toBeInTheDocument();
    });
});
