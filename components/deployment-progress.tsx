"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ExternalLink, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

interface DeploymentProgressProps {
  isDeploying: boolean
  isComplete: boolean
  deploymentUrl: string
}

export function DeploymentProgress({ isDeploying, isComplete, deploymentUrl }: DeploymentProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isDeploying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 1
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isDeploying])

  return (
    <div className="space-y-6">
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </div>

      {isComplete ? (
        <div className="space-y-4">
          <div className="flex items-center text-green-500">
            <CheckCircle className="mr-2 h-5 w-5" />
            <span className="font-medium">Deployment Complete!</span>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Your website is now live at:</p>
            <a
              href={deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-lg font-medium text-primary hover:underline"
            >
              {deploymentUrl}
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            <span>Parsing resume content</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            <span>Analyzing template style</span>
          </div>
          <div className="flex items-center text-sm">
            {progress > 30 ? (
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Generating website content</span>
          </div>
          <div className="flex items-center text-sm">
            {progress > 60 ? (
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Applying website template</span>
          </div>
          <div className="flex items-center text-sm">
            {progress > 80 ? (
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Configuring domain</span>
          </div>
          <div className="flex items-center text-sm">
            {progress === 100 ? (
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Deploying website</span>
          </div>
        </div>
      )}
    </div>
  )
}
