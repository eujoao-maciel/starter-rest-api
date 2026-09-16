import { describe, it, vi, expect } from "vitest";
import { health } from "./health.js";

describe("Health route", () => {
  it("Should return 200 status and server message", () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    health({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "server on" });
  });
});
