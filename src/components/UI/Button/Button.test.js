import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component Test', () => {
    let onClickButton;
    beforeEach(() => {
        onClickButton = jest.fn();
        render(<Button onClick={onClickButton}>Nuevo</Button>);
    });

    it('Render button with label', () => {
        const buttonLabel = screen.getByText('Nuevo', { exact: true });
        expect(buttonLabel).toBeInTheDocument();
    });

    it('Render button and call callback click function', async () => {
        const user = userEvent.setup();

        const buttonLabel = screen.getByText('Nuevo', { exact: true });
        await user.click(buttonLabel);

        expect(onClickButton).toHaveBeenCalled();
    });
});
