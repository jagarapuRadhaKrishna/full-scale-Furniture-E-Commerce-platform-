import { NextRequest, NextResponse } from 'next/server'
import { VisitorTracker } from '@/lib/visitor-tracker'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userAgent = request.headers.get('user-agent') || ''
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
    
    // Track the visitor
    const visitorData = await VisitorTracker.trackVisitor({
      ipAddress,
      userAgent,
      pageVisited: body.page || '/',
      referrer: body.referrer,
      sessionId: body.sessionId,
      location: body.location
    })
    
    return NextResponse.json({
      success: true,
      message: 'Visitor tracked successfully',
      visitorId: visitorData.id,
      timestamp: visitorData.timestamp
    })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to track visitor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const stats = VisitorTracker.getVisitorStats()
    const recentVisitors = VisitorTracker.getVisitors().slice(-10)
    
    return NextResponse.json({
      success: true,
      stats,
      recentVisitors: recentVisitors.map(visitor => ({
        id: visitor.id,
        timestamp: visitor.timestamp,
        page: visitor.pageVisited,
        device: visitor.deviceInfo.isMobile ? 'Mobile' : 'Desktop',
        browser: visitor.deviceInfo.browser,
        location: visitor.location
      }))
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get visitor stats' },
      { status: 500 }
    )
  }
}