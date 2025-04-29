"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface WebsitePreviewProps {
  resumeFile: File | null
  selectedTemplate: string | null
  onPreviewGenerated: (previewUrl: string) => void
}

export function WebsitePreview({ resumeFile, selectedTemplate, onPreviewGenerated }: WebsitePreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewContent, setPreviewContent] = useState<string | null>(null)

  const handleGeneratePreview = async () => {
    if (!resumeFile || !selectedTemplate) return

    setIsGenerating(true)
    setError(null)

    try {
      // Read the resume file content
      const resumeContent = await resumeFile.text()

      console.log('Sending request with:', {
        resumeContent: resumeContent.slice(0, 100) + '...', // Log first 100 chars
        templateStyle: selectedTemplate
      });

      // Call the website generation API
      const response = await fetch('/api/generate-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeContent,
          templateStyle: selectedTemplate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate website preview')
      }

      if (!data.website) {
        throw new Error('No website content received from server')
      }

      // Add necessary styles and scripts for preview
      const enhancedWebsite = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              /* Reset default styles */
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              /* Ensure preview fits container */
              html, body {
                width: 100%;
                height: 100%;
                overflow-x: hidden;
              }
            </style>
          </head>
          <body>
            ${data.website}
            <script>
              // Add any necessary preview scripts here
              document.addEventListener('DOMContentLoaded', function() {
                // Ensure all links open in new tab
                document.querySelectorAll('a').forEach(link => {
                  link.setAttribute('target', '_blank');
                  link.setAttribute('rel', 'noopener noreferrer');
                });
              });
            </script>
          </body>
        </html>
      `

      console.log('Website generated successfully');
      setPreviewContent(enhancedWebsite)

      // Create a preview URL
      const previewUrl = URL.createObjectURL(
        new Blob([enhancedWebsite], { type: 'text/html' })
      )
      onPreviewGenerated(previewUrl)
    } catch (error) {
      console.error('Error generating preview:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate preview. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Website Preview</h3>
        <Button 
          onClick={handleGeneratePreview} 
          disabled={isGenerating || !resumeFile || !selectedTemplate}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Preview'
          )}
        </Button>
      </div>

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      <Card>
        <CardContent className="p-4">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Generating your website preview...</p>
                <p className="text-xs text-muted-foreground mt-1">This may take a few moments</p>
              </div>
            ) : previewContent ? (
              <iframe 
                srcDoc={previewContent}
                className="w-full h-full border-0"
                title="Website Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">Click "Generate Preview" to see your website</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 