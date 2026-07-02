import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "This field is required" : "Not a string",
    })
    .trim()
    .min(2, { error: "Name must be at least two characters." })
    .max(50, { error: "Name cannot exceed 50 characters." }),

  email: z
    .string({
      error: (issue) => {
        issue.input === undefined ? "This field is required" : "Not a string";
      },
    })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: "Invalid email address" })),

  password: z
    .string({
      error: (issue) => {
        issue.input === undefined
          ? "Password in required"
          : "Password must be a string";
      },
    })
    .min(8, { error: "Password must be at least 8 characters" })
    .max(72, { error: "Password cannot exceed 72 characters" })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/,{
        error: "Password must contain at least one uppercase letter."
    })
    .regex(/\d/, {
        error: "Password must contain at least one number"
    })
    .regex(/[^A-Za-z0-9]/, {
        error: "Password must contain at least one special character"
    }),

  role: z.enum(['customer', 'seller']).default('customer')
    
});

export type RegisterSchema = z.infer<typeof registerSchema>

export default registerSchema;