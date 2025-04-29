import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ResumeData, generateWebsitePrompt } from '@/lib/resume-template';

// Function to parse resume content into structured data
const parseResumeContent = (content: string): ResumeData => {
  // This is a simplified parser. In a real application, you would want to use
  // a more sophisticated resume parser or NLP service.
  const lines = content.split('\n');
  const resumeData: ResumeData = {
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    education: [],
    skills: [],
    workExperience: [],
    projects: [],
    awards: [],
  };

  let currentSection = '';
  let currentItem: any = {};

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Detect section headers
    if (trimmedLine.toLowerCase().includes('education')) {
      currentSection = 'education';
    } else if (trimmedLine.toLowerCase().includes('skills')) {
      currentSection = 'skills';
    } else if (trimmedLine.toLowerCase().includes('experience')) {
      currentSection = 'workExperience';
    } else if (trimmedLine.toLowerCase().includes('projects')) {
      currentSection = 'projects';
    } else if (trimmedLine.toLowerCase().includes('awards')) {
      currentSection = 'awards';
    } else {
      // Parse content based on current section
      switch (currentSection) {
        case 'education':
          if (trimmedLine.includes('•')) {
            if (Object.keys(currentItem).length > 0) {
              resumeData.education.push(currentItem);
            }
            currentItem = {
              description: [],
            };
          } else {
            if (!currentItem.school) {
              currentItem.school = trimmedLine;
            } else if (!currentItem.date) {
              currentItem.date = trimmedLine;
            } else {
              currentItem.description.push(trimmedLine);
            }
          }
          break;
        case 'skills':
          if (trimmedLine.includes(':')) {
            const [category, items] = trimmedLine.split(':');
            resumeData.skills.push({
              category: category.trim(),
              items: items.split(',').map(item => item.trim()),
            });
          }
          break;
        case 'workExperience':
          if (trimmedLine.includes('•')) {
            if (Object.keys(currentItem).length > 0) {
              resumeData.workExperience.push(currentItem);
            }
            currentItem = {
              description: [],
            };
          } else {
            if (!currentItem.company) {
              currentItem.company = trimmedLine;
            } else if (!currentItem.date) {
              currentItem.date = trimmedLine;
            } else {
              currentItem.description.push(trimmedLine);
            }
          }
          break;
        case 'projects':
          if (trimmedLine.includes('•')) {
            if (Object.keys(currentItem).length > 0) {
              resumeData.projects.push(currentItem);
            }
            currentItem = {
              description: [],
              technologies: [],
            };
          } else {
            if (!currentItem.name) {
              currentItem.name = trimmedLine;
            } else if (!currentItem.date) {
              currentItem.date = trimmedLine;
            } else {
              currentItem.description.push(trimmedLine);
            }
          }
          break;
        case 'awards':
          if (trimmedLine.includes('•')) {
            if (Object.keys(currentItem).length > 0) {
              resumeData.awards.push(currentItem);
            }
            currentItem = {};
          } else {
            if (!currentItem.name) {
              currentItem.name = trimmedLine;
            } else if (!currentItem.date) {
              currentItem.date = trimmedLine;
            } else {
              currentItem.description = trimmedLine;
            }
          }
          break;
      }
    }
  }

  // Add the last item if exists
  if (Object.keys(currentItem).length > 0) {
    switch (currentSection) {
      case 'education':
        resumeData.education.push(currentItem);
        break;
      case 'workExperience':
        resumeData.workExperience.push(currentItem);
        break;
      case 'projects':
        resumeData.projects.push(currentItem);
        break;
      case 'awards':
        resumeData.awards.push(currentItem);
        break;
    }
  }

  return resumeData;
};

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { resumeContent, templateStyle } = await request.json();

    // Validate input
    if (!resumeContent || !templateStyle) {
      return NextResponse.json(
        { error: 'Missing required fields: resumeContent or templateStyle' },
        { status: 400 }
      );
    }

    console.log('Parsing resume content:', resumeContent.slice(0, 100) + '...');

    // Parse the resume content into structured data
    const resumeData = parseResumeContent(resumeContent);

    console.log('Parsed resume data:', JSON.stringify(resumeData, null, 2));

    // Generate the website prompt
    const prompt = generateWebsitePrompt(resumeData, templateStyle);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a professional web designer and developer. Your task is to create a complete, 
            functional website based on the provided resume data. The website should be contained in a single 
            HTML file with embedded CSS and JavaScript. Focus on creating a clean, professional design that 
            effectively presents the resume information.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      });

      const generatedWebsite = completion.choices[0].message.content;

      if (!generatedWebsite) {
        throw new Error('No content generated from OpenAI');
      }

      // Validate that the generated content is HTML
      if (!generatedWebsite.includes('<!DOCTYPE html>') || !generatedWebsite.includes('</html>')) {
        throw new Error('Generated content is not valid HTML');
      }

      console.log('Successfully generated website content');

      return NextResponse.json({ website: generatedWebsite });
    } catch (openAiError) {
      console.error('OpenAI API Error:', openAiError);
      return NextResponse.json(
        { error: 'Error calling OpenAI API: ' + (openAiError instanceof Error ? openAiError.message : 'Unknown error') },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating website:', error);
    return NextResponse.json(
      { error: 'Failed to generate website: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
} 