import { NextRequest, NextResponse } from 'next/server'
import { testConnection } from '@/lib/db'

/**
 * Health Check API Endpoint
 * Returns basic system info and database connectivity status.
 */
export async function GET(request: NextRequest) {
  try {
    const dbStatus = await testConnection()

    const systemInfo = {
      nodejs: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      memory: {
        total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
        used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
      },
    }

    if (dbStatus) {
      return NextResponse.json(
        {
          success: true,
          status: 'healthy',
          timestamp: new Date().toISOString(),
          services: {
            database: 'connected',
            api: 'running',
          },
          system: systemInfo,
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'disconnected',
          api: 'running',
        },
        system: systemInfo,
      },
      { status: 503 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: 'error',
        message: error?.message ?? String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
