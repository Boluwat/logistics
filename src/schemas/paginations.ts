import { z, TypeOf } from "zod";

export const paginationQuerySchema = z.object({
  limit: z.coerce
    .number().optional(),

  offset: z.coerce
    .number().optional(),
});
