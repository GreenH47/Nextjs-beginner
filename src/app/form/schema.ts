import { z } from "zod";

export const schema = z.object({
    name: z.string().min(1, "Subject is required").max(120),
    body: z.string().min(1, "Body is required").max(5000),
});
