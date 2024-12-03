import { TypeOf, array, boolean, number, object, string } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createPayloadSchema = object({
  sender: object({
    fullname: string({
      required_error: "name is required",
    }),
    email: string({
      required_error: "email is required",
    }).email(),
    phone: string({
      required_error: "phone is required",
    }),
    address: object({
      state: string().trim(),
      country: string().trim(),
      street: string().trim().optional(),
      postCode: string().trim().optional(),
      apartmentName: string().trim().optional(),
      description: string().trim().optional(),
    }),
  }),
  receiver: object({
    fullname: string({
      required_error: "name is required",
    }),
    email: string({
      required_error: "email is required",
    }).email(),
    phone: string({
      required_error: "phone is required",
    }),
    address: object({
      state: string().trim(),
      country: string().trim(),
      street: string().trim().optional(),
      postCode: string().trim().optional(),
      apartmentName: string().trim().optional(),
      description: string().trim().optional(),
    })
  }),
  items: array(
    object({
      descriptions: string({
        required_error: "descriptions is required",
      }),
      weight: number().min(0.5).optional(),
      length: number().min(0.1).optional(),
      height: number().min(0.1).optional(),
      width: number().min(0.1).optional(),
      value: number().min(1),
      quantity: number().min(1),
      category: string().trim(),
      volumeMetric: boolean(),
    })
  ),
});

export const updatePayloadSchema = object({
  name: string().optional(),
  pickUpDate: string().optional(),
});

export const trackPayloadSchema = object({
  trackingId: string({
    required_error: "Package Id is required",
  }),
});

export type CreateOnboardingInput = TypeOf<typeof createPayloadSchema>;
export type UpdateUserInput = TypeOf<typeof updatePayloadSchema>;
