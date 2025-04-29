"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const templates = [
    {
      id: "1",
      name: "Minimalist",
      description: "Clean, modern design ideal for tech professionals",
      image: "/images/template-minimalist.svg",
    },
    {
      id: "2",
      name: "Creative",
      description: "Vibrant design perfect for creative professionals",
      image: "/images/template-modern.svg",
    },
    {
      id: "3",
      name: "Business",
      description: "Professional, sophisticated design for business professionals",
      image: "/images/template-business.svg",
    },
  ]

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id)
    onSelect(id)
    localStorage.setItem('selectedTemplate', id)
  }

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedTemplate || ""}
        onValueChange={handleSelectTemplate}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem value={template.id} id={`template-${template.id}`} className="peer sr-only" />
            <Label
              htmlFor={`template-${template.id}`}
              className="flex flex-col border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full"
            >
              <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-3">
                <img
                  src={template.image}
                  alt={template.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="font-medium">{template.name}</div>
              <div className="text-sm text-muted-foreground">{template.description}</div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
