# AI Resume Website Generator

Transform your resume into a professional personal website in just a few steps.

## Project Overview

AI Resume Website Generator is a Next.js application that converts your resume into a beautiful personal website. Simply upload your resume, choose a template and domain, and deploy your personal website instantly.

### Key Features

- Resume parsing and conversion
- Multiple professional templates
- Custom domain selection
- Rapid deployment
- Responsive design

## Tech Stack

- **Frontend Framework**: Next.js 15.2.4
- **UI Components**: Shadcn UI
- **Database**: SQLite (Prisma)
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Deployment**: Netlify

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm
- OpenAI API key

### Installation Steps

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd ai-resume-website
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   Create a `.env.local` file and add the following:
   ```
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Initialize the database
   ```bash
   npx prisma generate
   ```

5. Start the development server
   ```bash
   pnpm dev
   ```

## Database Structure

The project uses an SQLite database (prisma/dev.db) to store user websites and domain information.

### Domain Availability Check

Domain availability is checked through Prisma queries to the `domain` table:

```typescript
// Check if domain already exists
const existingDomain = await prisma.domain.findUnique({
  where: { name: domainName }
});

if (existingDomain) {
  // Domain is already taken
  return { available: false, message: "Domain is already taken" };
}

// Domain is available
return { available: true };
```

### Data Models

The project uses the following Prisma models:

- **Website**: Stores website content, template, and expiration time
- **Domain**: Stores domain information and associated website

## User Types

### Regular Users

- Websites and domains expire 48 hours after creation
- After expiration, domains are released and available for other users

### Premium Users (Future Feature)

- Permanent domains
- Advanced templates
- More customization options

## API Key Usage

To optimize costs, the project uses the GPT-4o-mini model for resume parsing and website generation. The API key is stored in the `.env.local` file and is not exposed to the client.

## Deployment Process

1. User uploads resume
2. Selects website template
3. Chooses domain name
4. Clicks "Deploy Now" button
5. System generates website and deploys to `http://localhost:3000/[domain]`

## Contribution Guidelines

Contributions via Pull Requests and Issues are welcome. Please ensure you follow the project's code style and commit message conventions.

## License

[MIT License](LICENSE)
