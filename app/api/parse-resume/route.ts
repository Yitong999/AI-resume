// ✅ Backend API route: /api/parse-resume/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 动态导入 pdf-parse
const pdf = require('pdf-parse');

export const dynamic = 'force-dynamic'; // required for file uploads

export async function POST(request: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Get the file from the request
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Missing required field: file' },
        { status: 400 },
      );
    }

    // Check file type
    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 },
      );
    }

    console.log('Processing PDF file:', file.name);

    // Read PDF content
    const buffer = await file.arrayBuffer();
    console.log('PDF buffer size:', buffer.byteLength);

    try {
      const data = await pdf(Buffer.from(buffer));
      const text = data.text;
      console.log('Extracted text length:', text.length);

      // Call OpenAI API to extract information from text
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an AI that extracts structured resume data from raw text. 
Respond ONLY with a raw JSON object in the format below. Do NOT include any markdown, explanation, or comments.

Strictly match this format:
{
  "basic_info": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "linkedin": "string",
    "github": "string",
    "location": "string"
  },
  "education": [
    {
      "school": "string",
      "degree": "string",
      "major": "string",
      "start_date": "string",
      "end_date": "string",
      "gpa": "string"
    }
  ],
  "experience": [
    {
      "company": "string",
      "position": "string",
      "start_date": "string",
      "end_date": "string",
      "responsibilities": ["string"]
    }
  ],
  "skills": ["string"]
}
If any section is missing, return an empty object or empty array for it.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.2,
        max_tokens: 2000,
      });

      let content = completion.choices[0]?.message?.content || '{}';

      // Clean markdown formatting if present
      content = content.trim();
      if (content.startsWith('```')) {
        content = content.replace(/^```(?:json)?/, '').replace(/```$/, '').trim();
      }

      const parsedData = JSON.parse(content);
      console.log('Successfully parsed resume data');
      console.log('Parsed Resume JSON:\n', JSON.stringify(parsedData, null, 2));

      return NextResponse.json(parsedData);
    } catch (pdfError) {
      console.error('PDF parsing error:', pdfError);
      return NextResponse.json(
        { error: 'Failed to parse PDF file' },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error('Fatal error:', err);
    return NextResponse.json(
      { error: `Failed to process resume: ${(err as Error).message}` },
      { status: 500 },
    );
  }
}
