import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { add } from "date-fns"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { domain, html } = await req.json()

    // 1. 查看domain是否存在
    const existingDomain = await prisma.domain.findUnique({
      where: { name: domain }
    })

    if (existingDomain) {
      return NextResponse.json(
        { error: "Domain is already taken" },
        { status: 400 }
      )
    }

    // 设置48小时后的过期时间
    const expirationDate = add(new Date(), { hours: 48 })

    // 2. 保存网站数据
    const website = await prisma.website.create({
      data: {
        domain: domain,
        html: html,
        template: "direct-html",
        deployedAt: new Date(),
        expiresAt: expirationDate,
        isActive: true
      }
    })

    // 3. 保存域名记录
    await prisma.domain.create({
      data: {
        name: domain,
        websiteId: website.id,
        expiresAt: expirationDate,
        isActive: true
      }
    })

    // 4. 返回部署URL
    const deploymentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${domain}`
    
    return NextResponse.json({
      success: true,
      deploymentUrl,
      websiteId: website.id,
      expiresAt: expirationDate
    })

  } catch (error) {
    console.error("Direct deployment error:", error)
    return NextResponse.json(
      { error: "Failed to deploy website" },
      { status: 500 }
    )
  }
} 