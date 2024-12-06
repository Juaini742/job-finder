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

const ExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date",
  }),
  description: z.string().min(1, "Description is required"),
});

const EducationSchema = z.object({
  degree: requiredString,
  university: requiredString,
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid end date",
  }),
});

const CertificationSchema = z.object({
  name: requiredString,
  institutation: requiredString,
  score: requiredString,
  year: requiredString,
});

const HoobySchema = z.object({
  name: requiredString,
  description: requiredString,
});

const LanguageSchema = z.object({
  name: requiredString,
  proficiency: requiredString,
});

export const CvSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required." })
    .max(255, "Full name cannot exceed 255 characters.")
    .min(1, "Full name is required"),

  birthDay: z.date().refine((data) => data < new Date(), {
    message: "Birth day must be in the past",
  }),

  nationality: z
    .string({ required_error: "Nationality is required." })
    .max(255, "Nationality cannot exceed 255 characters.")
    .min(1, "Full name is required"),

  maritalStatus: z
    .string({ required_error: "Marital status is required." })
    .min(1, "Full name is required"),

  gender: z
    .string({ required_error: "Gender is required." })
    .min(1, "Full name is required"),

  address: z
    .string({ required_error: "Address is required." })
    .max(1000, "Address cannot exceed 1000 characters.")
    .min(1, "Full name is required"),

  summary: z
    .string({ required_error: "Summary is required." })
    .max(2000, "Summary cannot exceed 2000 characters.")
    .min(1, "Full name is required"),

  coverLetter: z
    .string({ required_error: "Cover letter is required." })
    .max(5000, "Cover letter cannot exceed 5000 characters.")
    .min(1, "Full name is required"),

  profilePictureUrl: z
    .string()
    .max(255, "Profile picture URL cannot exceed 255 characters.")
    .optional(),

  resumeUrl: z
    .string()
    .max(2000, "Resume URL cannot exceed 2000 characters.")
    .optional(),

  websiteUrl: z
    .string()
    .max(2000, "Website URL cannot exceed 2000 characters.")
    .optional(),

  skills: z.array(z.record(z.string(), z.any())),
  experience: z.array(ExperienceSchema),

  education: z.array(EducationSchema),

  certifications: z.array(CertificationSchema).optional(),

  hobbies: z.array(HoobySchema).optional(),

  languages: z.array(LanguageSchema).optional(),
});

export type CvValues = z.infer<typeof CvSchema>;
