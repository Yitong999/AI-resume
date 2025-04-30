export default function MinimalistTemplate({ resume }: { resume: any }) {
    return (
      <div className="p-8 font-sans max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">{resume.basic_info.name}</h1>
        <p className="text-gray-700 mt-1">
          {resume.basic_info.email} | {resume.basic_info.phone}
        </p>
        <p className="text-gray-700">{resume.basic_info.location}</p>
  
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Education</h2>
          {resume.education.map((edu: any, idx: number) => (
            <div key={idx} className="mt-2">
              <strong>{edu.degree}</strong> in {edu.major} <br />
              {edu.school} ({edu.start_date} – {edu.end_date}) — GPA: {edu.gpa}
            </div>
          ))}
        </section>
  
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Projects</h2>
          {resume.projects.map((proj: any, idx: number) => (
            <div key={idx} className="mt-2">
              <strong>{proj.name}</strong>: {proj.description} <br />
              <em>{proj.highlight}</em> <br />
              <a className="text-blue-600 underline" href={proj.link} target="_blank">
                {proj.link}
              </a>
            </div>
          ))}
        </section>
  
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <ul className="list-disc list-inside">
            {Object.entries(resume.skills).map(([key, value]: any) => (
              <li key={key}>
                <strong>{key.replaceAll("_", " ")}:</strong> {(value as string[]).join(", ")}
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
  