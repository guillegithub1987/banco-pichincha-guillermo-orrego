import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
} from './test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Pokemon CRUD app main flows', () => {
    it('Initial render', async () => {
        const { getByText, queryByText } = render(<App />);
        const titleElement = getByText(/Listado de Pokemones/i);
        expect(titleElement).toBeInTheDocument();

        expect(getByText('Loading.....')).toBeInTheDocument();
        await waitForElementToBeRemoved(() => queryByText('Loading.....'));
    });

    it('Delete pokemon flow', async () => {
        const user = userEvent.setup();
        const { getByText, queryByText } = render(<App />);

        // find delete icons of the rendered pokemons
        const pokemonDeleteIcons = await screen.findAllByRole('img', {
            name: /Delete$/i,
        });

        await user.click(pokemonDeleteIcons[0]);

        waitFor(() => {
            expect(getByText('Loading.....')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(queryByText('Loading.....')).not.toBeInTheDocument();
        });
    });

    it('Edit pokemon flow', async () => {
        const user = userEvent.setup();

        const { findAllByRole, getByText, queryByText } = render(<App />);

        // find edit icons of the rendered pokemons
        const pokemonEditIcons = await findAllByRole('img', {
            name: /Edit$/i,
        });

        await user.click(pokemonEditIcons[0]);

        // Verify modal is open with data of the selected pokemon
        waitFor(() => {
            expect(getByText('Editar Pokemones')).toBeInTheDocument();
        });

        // Verify modal name is of the selected pokemon
        const nameInput = screen.getByLabelText('name');
        expect(nameInput).toBeInTheDocument();

        // Try to edit without name
        user.clear(nameInput);
        expect(nameInput).toHaveValue('');
        const saveButton = screen.getByText('Guardar');
        expect(saveButton).toBeInTheDocument();

        await user.click(saveButton);
        expect(nameInput).toHaveClass('requiredEmpty');

        // Edit name and save changes
        await userEvent.type(nameInput, 'Name edited');
        expect(nameInput).toHaveValue('Name edited');
        await user.click(saveButton);

        waitFor(() => {
            expect(getByText('Loading.....')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(queryByText('Loading.....')).not.toBeInTheDocument();
        });
    });
});
