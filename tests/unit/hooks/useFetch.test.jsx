import { renderHook } from "@testing-library/react";
import { it, describe } from "vitest";
import useFetch from "../../../src/hooks/useFetch";
import { expect } from "vitest";
import { vi } from "vitest";
import axios from "axios";
import { act } from "react";

describe("useFetch", () => {
  it("should render initial values", () => {
    const { result } = renderHook(() => useFetch("/todos"));
    const [{ response, isLoading, error }, doFetch] = result.current;
    expect(error).toEqual(null);
    expect(isLoading).toEqual(false);
    expect(response).toEqual(null);
    expect(doFetch).toBeDefined();
  });

  it("should render success values after fetch", async () => {
    const mockResponse = {
      data: [{ id: 1, title: "foo" }],
    };
    vi.spyOn(axios, "request").mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useFetch("/todos"));
    await act(async () => {
      const [, doFetch] = result.current;
      await doFetch();
    });
    const [{ response, isLoading, error }] = result.current;
    expect(isLoading).toEqual(false);
    expect(error).toEqual(null);
    expect(response).toEqual(mockResponse.data);
  });

  it("should render error values after fetch", async () => {
    const mockResponse = {
      response: { data: "Server error" },
    };
    vi.spyOn(axios, "request").mockRejectedValue(mockResponse);
    const { result } = renderHook(() => useFetch("/todos"));
    await act(async () => {
      const [, doFetch] = result.current;
      await doFetch();
    });
    const [{ response, isLoading, error }] = result.current;
    expect(isLoading).toEqual(false);
    expect(error).toEqual("Server error");
    expect(response).toEqual(null);
  });

  it("should handle POST request", async () => {
    const mockResponse = {
      data: { id: 1, title: "foo" },
    };
    vi.spyOn(axios, "request").mockResolvedValue(mockResponse);
    const { result } = renderHook(() => useFetch("/todos"));
    await act(async () => {
      const [, doFetch] = result.current;
      await doFetch({
        method: "POST",
        data: { title: "New Todo" },
      });
    });
    const [{ response, isLoading, error }] = result.current;
    expect(isLoading).toEqual(false);
    expect(error).toEqual(null);
    expect(response).toEqual(mockResponse.data);
  });
});
