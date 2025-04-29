import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeploymentStatusProps {
  isDeploying: boolean
  isComplete: boolean
  deploymentUrl?: string
  error?: string
}

export function DeploymentStatus({
  isDeploying,
  isComplete,
  deploymentUrl,
  error
}: DeploymentStatusProps) {
  return (
    <div className="space-y-4">
      {isDeploying && (
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Deploying your website...</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {isComplete && deploymentUrl && (
        <div className="space-y-4">
          <div className="rounded-lg bg-green-50 p-4 text-green-600">
            <p>Your website has been successfully deployed!</p>
          </div>
          <div className="flex justify-center">
            <Button asChild>
              <a href={deploymentUrl} target="_blank" rel="noopener noreferrer">
                Visit Your Website
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 