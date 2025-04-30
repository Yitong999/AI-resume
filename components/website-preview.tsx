"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface WebsitePreviewProps {
  resumeFile: File | null
  selectedStyle: 'minimalist' | 'modern'
  onPreviewGenerated: (previewUrl: string) => void
}

export function WebsitePreview({ resumeFile, selectedStyle, onPreviewGenerated }: WebsitePreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGeneratePreview = async () => {
    if (!resumeFile) {
      setError('Please upload a resume first')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      // Step 1: Parse the resume
      const formData = new FormData()
      formData.append('file', resumeFile)

      const parseResponse = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      })

      if (!parseResponse.ok) {
        throw new Error('Failed to parse resume')
      }

      const resumeData = await parseResponse.json()

      // Step 2: Generate the website
      const generateResponse = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // resumeData,
          // style: selectedStyle,

          resumeData: resumeData,
          style: selectedStyle,

        }),
      })

      if (!generateResponse.ok) {
        throw new Error('Failed to generate website')
      }

      const { html } = await generateResponse.json()

      // Create a Blob URL for the preview
      const blob = new Blob([html], { type: 'text/html' })
      const previewUrl = URL.createObjectURL(blob)

      onPreviewGenerated(previewUrl)
    } catch (err) {
      console.error('Error generating preview:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate preview')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Preview</h2>
          <Button
            onClick={handleGeneratePreview}
            disabled={isGenerating || !resumeFile}
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
          <div className="rounded-md bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}
      </div>
    </Card>
  )
} 