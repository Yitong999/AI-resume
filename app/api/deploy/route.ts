import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { generateWebsite } from "@/lib/website-generator"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { domain, template, resumeData } = await req.json()

    // 1. Validate domain availability
    const existingDomain = await prisma.domain.findUnique({
      where: { name: domain }
    })

    if (existingDomain) {
      return NextResponse.json(
        { error: "Domain is already taken" },
        { status: 400 }
      )
    }

    // 2. Generate website HTML
    const { html } = await generateWebsite({
      template,
      resumeData
    })

    // 设置48小时后的过期时间
    const expirationDate = new Date(Date.now() + 48 * 60 * 60 * 1000)

    // 3. Save website data
    const website = await prisma.website.create({
      data: {
        domain: domain,
        html: html,
        template: template,
        deployedAt: new Date(),
        expiresAt: expirationDate,
        isActive: true
      }
    })

    // 4. Save domain record
    await prisma.domain.create({
      data: {
        name: domain,
        websiteId: website.id,
        expiresAt: expirationDate,
        isActive: true
      }
    })

    // 5. Return the deployment URL
    const deploymentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${domain}`
    
    return NextResponse.json({
      success: true,
      deploymentUrl,
      websiteId: website.id,
      expiresAt: expirationDate
    })

  } catch (error) {
    console.error("Deployment error:", error)
    return NextResponse.json(
      { error: "Failed to deploy website" },
      { status: 500 }
    )
  }
} 