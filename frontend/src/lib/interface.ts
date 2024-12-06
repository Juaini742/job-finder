export interface CommonResponse<T> {
  message: string;
  status: number;
  data: T;
}

export interface UserInterface {
  id: string;
  fullName: string;
  email: string;
  role: string;
  company: CompanyInterface | null;
  application:
    | {
        id: string;
        jobId: string;
        cvId: string;
        status: string;
      }[]
    | null;
}

export interface CompanyInterface {
  id: string;
  name: string;
  description: string;
  location: string;
  industry: string;
  logoUrl: string;
  foundedIn: string;
  organizationType: string;
  teamSize: number;
  websiteUrl: string;
  phone: string;
  email: string;
}

export interface ApplicationWithCompanyInterface {
  id: string;
  userId: string;
  jobId: string;
  status: string;
  createdAt: string;
  job: JobInterface;
  company: CompanyInterface;
}

export interface ApplicationInterface {
  id: string;
  userId: string;
  jobId: string;
  status: string;
  createdAt: string;
  cv: CvInterface;
  company: CompanyInterface | null;
}

export interface JobInterface {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  minSalary: number;
  maxSalary: number;
  saleryType: string;
  experience: string;
  jobType: string;
  jobRole: string;
  level: string;
  education: string;
  sharedAt: string;
  expiredAt: string;
  vacencies: string;
  tags: string[];
  jobBenefits: string[];
  applications: ApplicationInterface[] | null;
}

// CV
interface Certification {
  name: string;
  year: string;
  score: string;
}

interface Language {
  name: string;
  proficiency: string;
}

interface Education {
  degree: string;
  university: string;
  startDate: string;
  endDate: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface SkillCategory {
  items: string[];
  category: string;
}

export interface CvInterface {
  id: string;
  fullName: string;
  birthDay: string;
  nationality: string;
  maritalStatus: string;
  gender: string;
  address: string;
  summary: string;
  coverLetter: string;
  profilePictureUrl: string;
  resumeUrl: string;
  websiteUrl: string;
  skills: SkillCategory[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  certifications: Certification[];
}

// Application
export interface RequestApplication {
  cvId: string | undefined;
  jobId: string | undefined;
}

export interface ApplicationInterface {
  id: string;
  jobId: string;
  status: string;
  cv: CvInterface;
}
