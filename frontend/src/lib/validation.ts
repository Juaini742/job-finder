import z from "zod";

const requiredString = z.string().min(1, { message: "This field is required" });
const stringOptional = z.string().optional();

export const SignUpShema = z.object({
  fullName: requiredString,
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]+$/, { message: "Phone number must be valid" }),
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

export const JobShema = z.object({
  title: requiredString,
  tags: z.array(
    z.string().min(1, { message: "Please enter your tags of job" })
  ),
  jobBenefits: z.array(
    z.string().min(1, { message: "Please enter your tags of job" })
  ),
  experience: requiredString,
  jobType: requiredString,
  jobLevel: requiredString,
  education: requiredString,
  sharedAt: z.date().optional(),
  expiredAt: z.date().refine((data) => data > new Date(), {
    message: "Expiration date must be in the future",
  }),
  minSalary: stringOptional,
  maxSalary: stringOptional,
  description: stringOptional,
  country: requiredString,
  city: requiredString,
  jobRole: requiredString,
  salaryType: requiredString,
  vacancies: requiredString,
});

export type JobValeus = z.infer<typeof JobShema>;

export const CompanySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  location: z.string().optional(),
  industry: z.string().optional(),
  logoUrl: z
    .string()
    .url({ message: "Logo URL must be a valid URL" })
    .optional(),
  foundedIn: z.date({ message: "Founded date is required" }),
  organizationType: z.enum(["PRIVATE", "PUBLIC", "GOVERNMENT", "NGO"], {
    message:
      "Organization type must be one of PRIVATE, PUBLIC, GOVERNMENT, or NGO",
  }),
  teamSize: z
    .number()
    .nonnegative({ message: "Team size must be a non-negative number" })
    .optional(),
  websiteUrl: z
    .string()
    .url({ message: "Website URL must be a valid URL" })
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]+$/, { message: "Phone number must be valid" })
    .optional(),
  email: z
    .string()
    .email({ message: "Email must be a valid email address" })
    .optional(),
});

export type CompanyValues = z.infer<typeof CompanySchema>;
