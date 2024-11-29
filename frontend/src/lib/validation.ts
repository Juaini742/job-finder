import z from "zod";

const requiredString = z.string().min(1, { message: "This field is required" });

export const SignUpShema = z.object({
  fullName: requiredString,
  email: requiredString.email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: requiredString,
});

export type SignUpValeus = z.infer<typeof SignUpShema>;

export const SignInShema = z.object({
  email: requiredString.email(),
  password: requiredString,
});

export type SignInValeus = z.infer<typeof SignInShema>;
