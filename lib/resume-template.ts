export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  education: {
    degree: string;
    school: string;
    location: string;
    date: string;
    gpa?: string;
    relevantCourses?: string[];
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  researchExperience?: {
    title: string;
    institution: string;
    location: string;
    date: string;
    description: string[];
    advisor?: string;
  }[];
  workExperience: {
    position: string;
    company: string;
    location: string;
    date: string;
    description: string[];
  }[];
  projects: {
    name: string;
    date: string;
    description: string[];
    technologies: string[];
    link?: string;
  }[];
  awards: {
    name: string;
    date: string;
    description?: string;
  }[];
}

export const generateWebsitePrompt = (resumeData: ResumeData, templateStyle: string) => {
  let stylePrompt = '';
  switch (templateStyle) {
    case '1': // Minimalist
      stylePrompt = `
        Create a clean, modern, and minimalist website design for a tech professional.
        Design Requirements:
        1. Use a monochromatic color scheme with one accent color
        2. Focus on whitespace and typography
        3. Use subtle animations and transitions
        4. Implement a clean, grid-based layout
        5. Use modern, sans-serif fonts
        6. Include a fixed navigation bar
        7. Make it fully responsive
        8. Add smooth scroll behavior
        9. Use subtle shadows and rounded corners
        10. Implement a dark mode toggle
      `;
      break;
    case '2': // Creative
      stylePrompt = `
        Create a vibrant and creative website design for a creative professional.
        Design Requirements:
        1. Use a bold, vibrant color palette
        2. Implement dynamic layouts and animations
        3. Use artistic typography and visual elements
        4. Include interactive features
        5. Add visual storytelling elements
        6. Use creative transitions between sections
        7. Implement parallax scrolling effects
        8. Add hover animations
        9. Use custom illustrations or icons
        10. Make it visually engaging and unique
      `;
      break;
    case '3': // Business
      stylePrompt = `
        Create a professional and sophisticated website design for a business professional.
        Design Requirements:
        1. Use a corporate color scheme
        2. Implement a clean, structured layout
        3. Use professional typography
        4. Focus on credibility and trust
        5. Include clear call-to-action buttons
        6. Add professional imagery
        7. Use subtle animations
        8. Implement a professional navigation
        9. Add testimonials section
        10. Make it look corporate and trustworthy
      `;
      break;
    default:
      stylePrompt = 'Create a professional website design.';
  }

  return `
    Create a complete personal website based on the following resume data and design requirements.
    
    Resume Data:
    ${JSON.stringify(resumeData, null, 2)}
    
    Design Style:
    ${stylePrompt}
    
    Website Requirements:
    1. Create a complete HTML, CSS, and JavaScript code
    2. Include all sections from the resume data
    3. Make it fully responsive
    4. Ensure good performance
    5. Include proper meta tags for SEO
    6. Add proper accessibility features
    7. Use semantic HTML
    8. Include proper error handling
    9. Add loading states
    10. Make it easy to update content
    
    Return the complete code in a single HTML file that includes all necessary CSS and JavaScript.
  `;
}; 