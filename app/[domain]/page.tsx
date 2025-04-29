import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { cleanupExpiredSites } from '@/lib/cleanup'

const prisma = new PrismaClient()

interface PageProps {
  params: {
    domain: string
  }
}

export default async function WebsitePage({ params }: PageProps) {
  // 1. 清理过期的网站和域名
  await cleanupExpiredSites()

  // 2. 查找网站
  const website = await prisma.website.findFirst({
    where: {
      domain: params.domain,
      isActive: true
    }
  })

  // 3. 如果网站不存在或已过期，返回404
  if (!website) {
    notFound()
  }

  // 4. 渲染网站内容
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: website.html }} 
    />
  )
} 