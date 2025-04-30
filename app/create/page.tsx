"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ResumeUploader } from "@/components/resume-uploader"
import { TemplateSelector } from "@/components/template-selector"
import { DomainSelector } from "@/components/domain-selector"
import { WebsitePreview } from "@/components/website-preview"

export default function CreatePage() {
  const [step, setStep] = useState(1)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<'minimalist' | 'modern'>('modern')
  const [domain, setDomain] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleResumeUpload = (file: File) => {
    setResumeFile(file)
  }

  const handleStyleSelect = (style: 'minimalist' | 'modern') => {
    setSelectedStyle(style)
  }

  const handleDomainChange = (value: string) => {
    setDomain(value)
  }

  const handlePreviewGenerated = (url: string) => {
    setPreviewUrl(url)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="py-4">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="py-8 md:py-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Create Your Personal Website
            </h1>
            <p className="text-gray-500 md:text-lg">
              Just a few simple steps to generate your professional personal website
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-200 -translate-y-1/2"></div>
              <div className="relative flex justify-between">
                {[
                  { step: 1, label: "Upload Resume" },
                  { step: 2, label: "Choose Style" },
                  { step: 3, label: "Preview" },
                  { step: 4, label: "Select Domain" },
                  { step: 5, label: "Deploy Website" },
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      item.step === step 
                        ? "bg-primary text-white"
                        : item.step < step
                        ? "bg-primary/20 text-primary"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {item.step}
                    </div>
                    <span className="mt-2 text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <div className="rounded-lg border bg-card p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">Upload Your Resume</h2>
                      <p className="text-gray-500">
                        Upload your resume and our AI will automatically extract information
                      </p>
                    </div>
                    <ResumeUploader onUpload={handleResumeUpload} />
                    <div className="flex justify-end">
                      <Button onClick={nextStep} disabled={!resumeFile}>
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">Choose Website Style</h2>
                      <p className="text-gray-500">Select a style that suits your professional needs</p>
                    </div>
                    <TemplateSelector onSelect={handleStyleSelect} />
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous Step
                      </Button>
                      <Button onClick={nextStep}>
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">Preview Your Website</h2>
                      <p className="text-gray-500">Generate and preview your website before deployment</p>
                    </div>
                    <WebsitePreview 
                      resumeFile={resumeFile}
                      selectedStyle={selectedStyle}
                      onPreviewGenerated={handlePreviewGenerated}
                    />
                    {previewUrl && (
                      <div className="mt-4">
                        <iframe 
                          src={previewUrl} 
                          className="w-full h-[600px] border rounded-lg"
                          title="Website Preview"
                        />
                      </div>
                    )}
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous Step
                      </Button>
                      <Button onClick={nextStep} disabled={!previewUrl}>
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">Choose Your Domain</h2>
                      <p className="text-gray-500">Select a domain for your personal website</p>
                    </div>
                    <DomainSelector onChange={handleDomainChange} />
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous Step
                      </Button>
                      <Button onClick={nextStep} disabled={!domain}>
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">Deploy Your Website</h2>
                      <p className="text-gray-500">
                        Confirm information and deploy your personal website with one click
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="font-semibold">Resume</h3>
                          <p className="text-gray-500">{resumeFile?.name}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Style</h3>
                          <p className="text-gray-500">{selectedStyle}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous Step
                      </Button>
                      <Button onClick={nextStep} disabled={!domain}>
                        Deploy Website
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
