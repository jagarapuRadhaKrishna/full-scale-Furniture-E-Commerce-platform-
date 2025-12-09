// Enhanced visitor tracking system
export interface VisitorData {
  id: string
  ipAddress: string
  userAgent: string
  timestamp: Date
  location?: {
    country?: string
    city?: string
    region?: string
  }
  pageVisited: string
  referrer?: string
  sessionId: string
  deviceInfo: {
    isMobile: boolean
    browser: string
    os: string
  }
  timeSpent?: number
}

export class VisitorTracker {
  private static visitors: VisitorData[] = []
  
  static async trackVisitor(visitorData: Partial<VisitorData>): Promise<VisitorData> {
    const visitor: VisitorData = {
      id: this.generateId(),
      ipAddress: visitorData.ipAddress || 'unknown',
      userAgent: visitorData.userAgent || 'unknown',
      timestamp: new Date(),
      pageVisited: visitorData.pageVisited || '/',
      referrer: visitorData.referrer,
      sessionId: visitorData.sessionId || this.generateSessionId(),
      deviceInfo: visitorData.deviceInfo || this.parseUserAgent(visitorData.userAgent || ''),
      location: visitorData.location
    }
    
    // Store visitor data
    this.visitors.push(visitor)
    
    // Send admin notification
    await this.notifyAdminOfVisitor(visitor)
    
    return visitor
  }
  
  static async notifyAdminOfVisitor(visitor: VisitorData) {
    try {
      // Import WhatsApp service
      const { automatedWhatsApp } = await import('./automated-whatsapp')
      
      const message = this.formatVisitorMessage(visitor)
      await automatedWhatsApp.sendToAllAdmins(message)
      
      console.log('Admin notified of new visitor:', visitor.id)
    } catch (error) {
      console.error('Failed to notify admin of visitor:', error)
    }
  }
  
  private static formatVisitorMessage(visitor: VisitorData): string {
    const deviceType = visitor.deviceInfo.isMobile ? '📱 Mobile' : '💻 Desktop'
    const location = visitor.location 
      ? `${visitor.location.city || 'Unknown'}, ${visitor.location.country || 'Unknown'}`
      : 'Unknown Location'
    
    return `🌟 *NEW WEBSITE VISITOR* 🌟

👤 *Visitor Details:*
📅 Time: ${visitor.timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
🌐 Page: ${visitor.pageVisited}
${deviceType}
📍 Location: ${location}
🔗 Browser: ${visitor.deviceInfo.browser}
💻 OS: ${visitor.deviceInfo.os}
${visitor.referrer ? `🔗 Came from: ${visitor.referrer}` : '🔗 Direct visit'}

*DFW - Divya Furniture World*
Premium Furniture & Interiors`
  }
  
  private static parseUserAgent(userAgent: string) {
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)
    let browser = 'Unknown'
    let os = 'Unknown'
    
    // Simple browser detection
    if (userAgent.includes('Chrome')) browser = 'Chrome'
    else if (userAgent.includes('Firefox')) browser = 'Firefox'
    else if (userAgent.includes('Safari')) browser = 'Safari'
    else if (userAgent.includes('Edge')) browser = 'Edge'
    
    // Simple OS detection
    if (userAgent.includes('Windows')) os = 'Windows'
    else if (userAgent.includes('Mac')) os = 'macOS'
    else if (userAgent.includes('Linux')) os = 'Linux'
    else if (userAgent.includes('Android')) os = 'Android'
    else if (userAgent.includes('iOS')) os = 'iOS'
    
    return { isMobile, browser, os }
  }
  
  private static generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }
  
  private static generateSessionId(): string {
    return 'session_' + Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9)
  }
  
  static getVisitors(): VisitorData[] {
    return this.visitors
  }
  
  static getVisitorStats() {
    const total = this.visitors.length
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todayVisitors = this.visitors.filter(v => v.timestamp >= today).length
    const mobileUsers = this.visitors.filter(v => v.deviceInfo.isMobile).length
    const desktopUsers = this.visitors.filter(v => !v.deviceInfo.isMobile).length
    
    return {
      total,
      today: todayVisitors,
      mobile: mobileUsers,
      desktop: desktopUsers,
      mobilePercentage: total > 0 ? Math.round((mobileUsers / total) * 100) : 0
    }
  }
}