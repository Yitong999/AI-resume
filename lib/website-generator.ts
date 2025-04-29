interface GenerateWebsiteParams {
  template: string
  resumeData: any
}

export async function generateWebsite({ template, resumeData }: GenerateWebsiteParams) {
  // 根据模板生成HTML
  let html = ''

  switch (template) {
    case 'minimalist':
      html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${resumeData.name} - Personal Website</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              line-height: 1.5;
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
            }
            h1 { font-size: 2.5rem; margin-bottom: 1rem; }
            h2 { font-size: 1.5rem; margin-top: 2rem; }
            .contact { color: #666; }
            .section { margin-bottom: 2rem; }
          </style>
        </head>
        <body>
          <h1>${resumeData.name}</h1>
          <p class="contact">${resumeData.email} | ${resumeData.phone}</p>
          
          <div class="section">
            <h2>About</h2>
            <p>${resumeData.summary}</p>
          </div>

          <div class="section">
            <h2>Experience</h2>
            ${resumeData.experience.map((exp: any) => `
              <div>
                <h3>${exp.title} at ${exp.company}</h3>
                <p>${exp.date}</p>
                <p>${exp.description}</p>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <h2>Education</h2>
            ${resumeData.education.map((edu: any) => `
              <div>
                <h3>${edu.degree} - ${edu.school}</h3>
                <p>${edu.date}</p>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <h2>Skills</h2>
            <p>${resumeData.skills.join(', ')}</p>
          </div>
        </body>
        </html>
      `
      break

    case 'creative':
      html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${resumeData.name} - Personal Website</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              line-height: 1.6;
              margin: 0;
              color: #333;
              background: #f5f5f5;
            }
            .container {
              max-width: 1000px;
              margin: 0 auto;
              padding: 4rem 2rem;
            }
            header {
              text-align: center;
              margin-bottom: 4rem;
            }
            h1 {
              font-size: 3rem;
              margin-bottom: 1rem;
              color: #2563eb;
            }
            .section {
              background: white;
              padding: 2rem;
              border-radius: 1rem;
              margin-bottom: 2rem;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 2rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <header>
              <h1>${resumeData.name}</h1>
              <p>${resumeData.email} | ${resumeData.phone}</p>
            </header>

            <div class="section">
              <h2>About Me</h2>
              <p>${resumeData.summary}</p>
            </div>

            <div class="grid">
              <div class="section">
                <h2>Experience</h2>
                ${resumeData.experience.map((exp: any) => `
                  <div>
                    <h3>${exp.title}</h3>
                    <h4>${exp.company}</h4>
                    <p>${exp.date}</p>
                    <p>${exp.description}</p>
                  </div>
                `).join('')}
              </div>

              <div class="section">
                <h2>Education</h2>
                ${resumeData.education.map((edu: any) => `
                  <div>
                    <h3>${edu.degree}</h3>
                    <h4>${edu.school}</h4>
                    <p>${edu.date}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="section">
              <h2>Skills</h2>
              <div class="grid">
                ${resumeData.skills.map((skill: string) => `
                  <div class="skill">${skill}</div>
                `).join('')}
              </div>
            </div>
          </div>
        </body>
        </html>
      `
      break

    default:
      throw new Error(`Template "${template}" not found`)
  }

  return { html }
} 