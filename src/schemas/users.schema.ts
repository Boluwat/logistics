import { TypeOf, object, string } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const loginPayloadSchema = object({
  email: string({
    required_error: "Email is required.",
  }).email(),
  password: string({
    required_error: "Password is required.",
  }),
});
export const createPayloadSchema = object({
    email: string({
      required_error: "Email is required.",
    }).email(),
    password: string({
      required_error: "Password is required.",
    }),
    firstname: string({
      required_error: "Firstname is required.",
    }),
    lastname: string({
      required_error: "Lastname is required.",
    }),
    phone: string({
      required_error: "Phone number is required.",
    }),
});

export const updatePayloadSchema = object({
  email: string().email().optional(),
  phone: string().optional(),
  address: object({
    state: string().optional(),
    country: string().optional(),
    street: string().optional(),
  }).optional(),
});

export type CreateOnboardingInput = TypeOf<typeof createPayloadSchema>;
export type UpdateUserInput = TypeOf<typeof updatePayloadSchema>;
export type LoginUserInput = TypeOf<typeof loginPayloadSchema>;
