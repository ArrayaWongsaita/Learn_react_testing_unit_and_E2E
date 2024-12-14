import { describe, it } from "vitest";
import useCounter from "../../../src/hooks/useCounter";
import { render, screen } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe('useCounter', () => {
    it('should render initial count', async () => {
        const user = userEvent.setup();
        const TestComp = () => {
            const [count, increaseCounter] = useCounter();
            return <div>
                <div>{count}</div>
                <button onClick={increaseCounter}>Increase</button>
            </div>
        }
        render(<TestComp />);
        expect(screen.getByText('0')).toBeInTheDocument();
        await user.click(screen.getByText('Increase'));
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('should render initial count from hook', () => {
        const { result } = renderHook(() => useCounter(5));
        expect(result.current[0]).toBe(5);
    });

    it('should increment count from hook', () => {
        const { result } = renderHook(() => useCounter(5));
        act(() => {
            result.current[1]();
        });
        expect(result.current[0]).toBe(6);
    });

    it('should increment count multiple times', () => {
        const { result } = renderHook(() => useCounter(5));
        const [, increaseCounter] = result.current;
        act(() => {
            increaseCounter();
            increaseCounter();
            increaseCounter();
        });
        expect(result.current[0]).toBe(8);
    });
});
