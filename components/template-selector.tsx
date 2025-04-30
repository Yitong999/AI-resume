"use client"

import { useState } from "react"
import { Card } from "./ui/card"

interface TemplateSelectorProps {
  onSelect: (style: 'minimalist' | 'modern') => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [selectedStyle, setSelectedStyle] = useState<'minimalist' | 'modern'>('modern')

  const handleSelect = (style: 'minimalist' | 'modern') => {
    setSelectedStyle(style)
    onSelect(style)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card 
        className={`p-4 cursor-pointer transition-colors ${
          selectedStyle === 'minimalist' 
            ? 'border-primary bg-primary/5' 
            : 'hover:border-primary'
        }`}
        onClick={() => handleSelect('minimalist')}
      >
        <div className="space-y-2">
          <h3 className="font-semibold">Minimalist</h3>
          <p className="text-sm text-gray-500">
            Clean and professional design with focus on content
          </p>
        </div>
      </Card>
      <Card 
        className={`p-4 cursor-pointer transition-colors ${
          selectedStyle === 'modern' 
            ? 'border-primary bg-primary/5' 
            : 'hover:border-primary'
        }`}
        onClick={() => handleSelect('modern')}
      >
        <div className="space-y-2">
          <h3 className="font-semibold">Modern</h3>
          <p className="text-sm text-gray-500">
            Contemporary design with visual elements and animations
          </p>
        </div>
      </Card>
    </div>
  )
}
