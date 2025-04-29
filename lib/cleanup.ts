import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function cleanupExpiredSites() {
  const now = new Date()

  // 1. 找到所有过期的网站
  const expiredWebsites = await prisma.website.findMany({
    where: {
      isActive: true,
      expiresAt: {
        lt: now
      }
    }
  })

  // 2. 更新网站状态为非活跃
  if (expiredWebsites.length > 0) {
    await prisma.website.updateMany({
      where: {
        id: {
          in: expiredWebsites.map(site => site.id)
        }
      },
      data: {
        isActive: false
      }
    })
  }

  // 3. 找到所有过期的域名
  const expiredDomains = await prisma.domain.findMany({
    where: {
      isActive: true,
      expiresAt: {
        lt: now
      }
    }
  })

  // 4. 更新域名状态为非活跃
  if (expiredDomains.length > 0) {
    await prisma.domain.updateMany({
      where: {
        id: {
          in: expiredDomains.map(domain => domain.id)
        }
      },
      data: {
        isActive: false
      }
    })
  }

  return {
    expiredWebsites: expiredWebsites.length,
    expiredDomains: expiredDomains.length
  }
} 