
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

export async function POST(request: Request) {
  try {
    const { resumeData, style } = await request.json();

    if (!resumeData || !style) {
      return NextResponse.json(
        { error: 'Missing required fields: resumeData and style' },
        { status: 400 },
      );
    }

    const templatePath = path.join(process.cwd(), 'templates', `${style}.html`);
    const templateSource = fs.readFileSync(templatePath, 'utf-8');

    const template = handlebars.compile(templateSource);

    // Normalize skills to string array
    if (typeof resumeData.skills === 'string') {
        resumeData.skills = resumeData.skills.split(',').map(s => s.trim()).filter(Boolean);
    }

    const html = template(resumeData);

    return NextResponse.json({ html });
  } catch (err) {
    console.error('Error generating resume:', err);
    return NextResponse.json(
      { error: 'Failed to generate resume website' },
      { status: 500 },
    );
  }
}
