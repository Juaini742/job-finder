"use client";

import { Button } from "@/components/ui/button";
import { useGetCvQuery } from "@/store/slices/cvSlice";
import { LucideIceCreamCone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GoogleImg from "Img/g.png";

export default function CvItem() {
  const { data, isLoading } = useGetCvQuery();
  const cv = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!cv || Object.keys(cv).length === 0 || !cv.fullName) {
    return (
      <div className="p-4 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">No CV Found</h2>
        <p className="text-gray-500 mb-4">
          Please create a CV to apply for the job.
        </p>
        <Link href="profile/form">
          <Button>Create CV</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-6">
          <Image
            src={GoogleImg}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <div>
            <h1 className="text-2xl font-bold">{cv.fullName}</h1>
            <p className="text-gray-500">
              {cv.address || "No address provided"}
            </p>
            <div className="flex gap-4 mt-2">
              {cv.websiteUrl && (
                <a
                  href={cv.websiteUrl}
                  target="blank"
                  className="text-blue-500 hover:underline"
                >
                  Website
                </a>
              )}
              {cv.resumeUrl && (
                <a
                  href={cv.resumeUrl}
                  target="blank"
                  className="text-blue-500 hover:underline"
                >
                  Resume
                </a>
              )}
            </div>
          </div>
        </div>
        <div>
          <Link href="profile/form">
            <Button>Update CV</Button>
          </Link>
        </div>
      </div>

      {/* Personal Info */}
      <div className="mt-6 grid grid-cols-2 gap-4 pl-5">
        {cv.birthDay && (
          <InfoRow icon="calendar" label="Date of Birth" value={cv.birthDay} />
        )}
        {cv.nationality && (
          <InfoRow icon="flag" label="Nationality" value={cv.nationality} />
        )}
        {cv.maritalStatus && (
          <InfoRow
            icon="heart"
            label="Marital Status"
            value={cv.maritalStatus}
          />
        )}
        {cv.gender && <InfoRow icon="user" label="Gender" value={cv.gender} />}
      </div>

      {/* Sections */}
      {cv.summary && (
        <Section title="Summary">
          <div dangerouslySetInnerHTML={{ __html: cv.summary }} />
        </Section>
      )}

      {/* Sections */}
      {cv.summary && (
        <Section title="Cove Letter">
          <div dangerouslySetInnerHTML={{ __html: cv.coverLetter }} />
        </Section>
      )}

      {cv.skills?.length > 0 && (
        <Section title="Skills">
          <div className="grid grid-cols-2 gap-4">
            {cv.skills.map((category) => (
              <div key={category.category}>
                <h3 className="font-semibold">{category.category}</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {category.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Other sections like Experience, Education, Languages, Certifications */}
      <CvDetails
        title="Experience"
        data={cv.experience}
        renderItem={(exp) => (
          <div key={exp.company} className="mb-4">
            <h3 className="font-semibold">{exp.position}</h3>
            <p className="text-gray-500">
              {exp.company} | <span className="italic">{exp.startDate}</span> -{" "}
              <span className="italic">{exp.endDate}</span>
            </p>
            <p>{exp.description}</p>
          </div>
        )}
      />

      <CvDetails
        title="Education"
        data={cv.education}
        renderItem={(edu) => (
          <div key={edu.degree} className="mb-4">
            <h3 className="font-semibold">{edu.degree}</h3>
            <p className="text-gray-500">
              {edu.university} | <span className="italic">{edu.startDate}</span>{" "}
              - <span className="italic">{edu.endDate}</span>
            </p>
          </div>
        )}
      />

      <CvDetails
        title="Languages"
        data={cv.languages}
        renderItem={(lang) => (
          <li key={lang.name}>
            {lang.name} - {lang.proficiency}
          </li>
        )}
      />

      <CvDetails
        title="Certifications"
        data={cv.certifications}
        renderItem={(cert) => (
          <div key={cert.name} className="mb-2">
            <h3 className="font-semibold">{cert.name}</h3>
            <p className="text-gray-500">
              {cert.year} | {cert.score}
            </p>
          </div>
        )}
      />
    </div>
  );
}

// function CvSkeleton() {
//   return (
//     <div className="p-4 bg-gray-100 shadow-md rounded-lg">
//       <div className="animate-pulse flex space-x-4">
//         <div className="rounded-full bg-gray-300 h-24 w-24"></div>
//         <div className="flex-1 space-y-4 py-1">
//           <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//           <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//           <div className="h-4 bg-gray-300 rounded w-1/3"></div>
//         </div>
//       </div>
//       <div className="mt-6 space-y-4">
//         <div className="h-4 bg-gray-300 rounded"></div>
//         <div className="h-4 bg-gray-300 rounded w-5/6"></div>
//         <div className="h-4 bg-gray-300 rounded w-2/3"></div>
//       </div>
//     </div>
//   );
// }

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <LucideIceCreamCone name={icon} className="w-5 h-5 text-gray-600" />
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-gray-700">{value}</p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold border-b pb-2 mb-4">{title}</h2>
      <div className="pl-5">{children}</div>
    </div>
  );
}

function CvDetails<T>({
  title,
  data,
  renderItem,
}: {
  title: string;
  data: T[] | undefined;
  renderItem: (item: T) => JSX.Element;
}) {
  if (!data || data.length === 0) return null;

  return (
    <Section title={title}>
      <div>{data.map(renderItem)}</div>
    </Section>
  );
}
