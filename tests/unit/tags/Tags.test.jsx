import { render, screen } from "@testing-library/react";
import {  it, describe, expect, beforeAll, afterAll, afterEach } from "vitest";
import Tags from "../../../src/tags/Tags";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
// import axios from "axios";
// import { vi } from "vitest";

describe("tags", () => {
  const server = setupServer(
    http.get("http://localhost:3001/tags", () => {
      return HttpResponse.json([{ id: "1" ,name: "bar" }]);
    })
  );

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it("should render tags", async () => {
    // const mockResponse ={ data:[{ id: "1", name: "bar" }]};
    // vi.spyOn(axios, "get").mockResolvedValue(mockResponse);
    render(<Tags />);
    const tags = await screen.findAllByTestId('tags');
    expect(tags).toHaveLength(1);
    expect(tags[0]).toHaveTextContent("bar");
  });
});
