import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../store/index';

export function renderWithProviders(ui, options) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}

// re-export everything
export * from '@testing-library/react';

// override render method additional comment
export { renderWithProviders as render };
