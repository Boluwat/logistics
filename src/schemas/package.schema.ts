// import { number, required } from "joi";
import { TypeOf, number, object, string } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createPayloadSchema = object({
    name: string({
      required_error: "Package name is required.",
    }),
    pickUpDate: string(),
});

export const updatePayloadSchema = object({
  name: string().optional(),
  pickUpDate: string().optional(),
});

export const trackPayloadSchema = object({
  trackingId: string({
    required_error: "Package Id is required"
  })
});



export type CreateOnboardingInput = TypeOf<typeof createPayloadSchema>;
export type UpdateUserInput = TypeOf<typeof updatePayloadSchema>;
