import {
    render,
    screen,
    waitFor,
    waitForElementToBeRemoved,
    fireEvent,
} from './test-utils/testing-library-utils';
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
        const { getByText, queryByText } = render(<App />);

        // find delete icons of the rendered pokemons
        const pokemonDeleteIcons = await screen.findAllByRole('img', {
            name: /Delete$/i,
        });

        fireEvent.click(pokemonDeleteIcons[0]);

        await waitFor(() => {
            expect(getByText('Loading.....')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(queryByText('Loading.....')).not.toBeInTheDocument();
        });
    });

    it('Edit pokemon flow', async () => {
        const { findAllByRole, getByText, queryByText } = render(<App />);

        // find edit icons of the rendered pokemons
        const pokemonEditIcons = await findAllByRole('img', {
            name: /Edit$/i,
        });

        fireEvent.click(pokemonEditIcons[0]);

        let nameInput;
        await waitFor(() => {
            // Verify modal is open with data of the selected pokemon
            expect(getByText('Editar Pokemon')).toBeInTheDocument();

            // Verify modal name input is rendered
            nameInput = screen.getByLabelText('name');
            expect(nameInput).toBeInTheDocument();
        });

        // Try to edit without name
        fireEvent.change(nameInput, { target: { value: '' } });
        await waitFor(() => {
            expect(nameInput).toHaveValue('');
        });

        const saveButton = screen.getByText('Guardar');
        expect(saveButton).toBeInTheDocument();

        fireEvent.click(saveButton);
        await waitFor(() => {
            expect(nameInput).toHaveClass('requiredEmpty');
        });

        // Edit name and save changes
        fireEvent.change(nameInput, { target: { value: 'Name edited' } });
        await waitFor(() => {
            expect(nameInput).toHaveValue('Name edited');
        });

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(getByText('Loading.....')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(queryByText('Loading.....')).not.toBeInTheDocument();
        });
    });

    it('New pokemon flow', async () => {
        const { getByText, queryByText } = render(<App />);

        // find new button
        const buttonLabel = screen.getByText('Nuevo', { exact: true });
        expect(buttonLabel).toBeInTheDocument();

        fireEvent.click(buttonLabel);

        waitFor(() => {
            // Verify modal is open with data of the selected pokemon
            expect(getByText('Nuevo Pokemon')).toBeInTheDocument();

            // Verify modal name input is rendered
            const nameInput = screen.getByLabelText('name');
            expect(nameInput).toBeInTheDocument();
        });

        // Try to edit without name
        const nameInput = screen.getByLabelText('name');
        fireEvent.change(nameInput, { target: { value: '' } });
        await waitFor(() => {
            expect(nameInput).toHaveValue('');
        });

        const saveButton = screen.getByText('Guardar');
        expect(saveButton).toBeInTheDocument();

        fireEvent.click(saveButton);
        await waitFor(() => {
            expect(nameInput).toHaveClass('requiredEmpty');
        });

        // Enter new data and save
        fireEvent.change(nameInput, { target: { value: 'New Pokemon' } });
        await waitFor(() => {
            expect(nameInput).toHaveValue('New Pokemon');
        });

        const urlInput = screen.getByLabelText('url');
        await waitFor(() => {
            expect(urlInput).toHaveValue('');
        });

        fireEvent.change(urlInput, {
            target: {
                value: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png',
            },
        });
        await waitFor(() => {
            expect(urlInput).toHaveValue(
                'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png'
            );
        });

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(getByText('Loading.....')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(queryByText('Loading.....')).not.toBeInTheDocument();
        });
    });
});
