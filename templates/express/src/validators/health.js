import { z } from "zod";

export const healthValidator = z.object({
  status: z.number(),
  message: z.string().message("server on"),
});
