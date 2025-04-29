"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { DeploymentStatus } from "../../../components/deployment-status"

export default function DeployPage() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [deploymentUrl, setDeploymentUrl] = useState("")
  const [error, setError] = useState("")

  const handleDeploy = async () => {
    setIsDeploying(true)
    setError("")

    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: "your-domain",
          template: "creative",
          resumeId: "resume-id"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to deploy website")
      }

      setDeploymentUrl(data.deploymentUrl)
      setIsComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to deploy website")
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="py-4">
          <Link href="/create" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Previous Step
          </Link>
        </div>

        <div className="py-8 md:py-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Deploy Your Website
            </h1>
            <p className="text-gray-500 md:text-lg">
              Confirm your information and deploy your personal website
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <div className="rounded-lg border bg-card p-8">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold">Resume</h3>
                    <p className="text-gray-500">resume_v2.pdf</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Template</h3>
                    <p className="text-gray-500">Creative</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Domain</h3>
                  <p className="text-gray-500">your-domain.vercel.app</p>
                </div>

                <DeploymentStatus
                  isDeploying={isDeploying}
                  isComplete={isComplete}
                  deploymentUrl={deploymentUrl}
                  error={error}
                />

                {!isDeploying && !isComplete && (
                  <div className="flex items-center justify-between">
                    <Button variant="outline" asChild>
                      <Link href="/create">Previous Step</Link>
                    </Button>
                    <Button onClick={handleDeploy}>Deploy Now</Button>
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