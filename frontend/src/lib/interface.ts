export interface UserInterface {
  id: string;
  fullName: string;
  email: string;
  role: string;
  company: CompanyInterface | null;
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
}

interface Certification {
  name: string;
  year: number;
  score: string | number;
}

interface LanguageCertification {
  name: string;
  year: number;
  score: number;
}

interface Language {
  name: string;
  proficiency: string;
  certifications?: LanguageCertification[];
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
