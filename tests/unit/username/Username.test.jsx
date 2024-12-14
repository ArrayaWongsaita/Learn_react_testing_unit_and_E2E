import { render, screen } from "@testing-library/react"
import { describe , it} from "vitest"
import Username from "../../../src/username/Username";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe('username', () => {
    it('render default empty text', () => {
        render(<Username />);
        expect(screen.getByTestId('username')).toHaveTextContent('');

    })
    it('render changed username with button',async () => {
        const user = userEvent.setup();
        render(<Username />);
        await user.click(screen.getByTestId('button'));
        expect(screen.getByTestId('username')).toHaveTextContent('bar');

    })
    it('render changed username with input',async () => {
        const user = userEvent.setup();
        render(<Username />);
        await user.type(screen.getByTestId('usernameInput'), 'foo');
        expect(screen.getByTestId('username')).toHaveTextContent('foo');

    })
 })
