#!/usr/bin/env node

// Environment Configuration Validator
// Run with: node validate-setup.js

const requiredVars = {
  // Essential (App won't work without these)
  essential: [
    'MONGODB_URI',
    'JWT_SECRET', 
    'JWT_REFRESH_SECRET'
  ],
  
  // Core Features (Authentication features need these)
  core: [
    'SMTP_USER',
    'SMTP_PASS',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN', 
    'TWILIO_PHONE_NUMBER'
  ],
  
  // Optional (Enhanced features)
  optional: [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'CLOUDINARY_CLOUD_NAME',
    'RAZORPAY_KEY_ID'
  ]
}

function validateSetup() {
  console.log('🔍 DFW Furniture - Environment Validation\n')
  
  let essentialMissing = []
  let coreMissing = []
  let optionalMissing = []
  
  // Check essential variables
  console.log('✅ Essential Configuration:')
  requiredVars.essential.forEach(varName => {
    const value = process.env[varName]
    if (!value || value.includes('your-') || value.includes('change-this')) {
      essentialMissing.push(varName)
      console.log(`  ❌ ${varName}: MISSING or using template value`)
    } else {
      console.log(`  ✅ ${varName}: Configured`)
    }
  })
  
  console.log('\n🔐 Authentication Features:')
  requiredVars.core.forEach(varName => {
    const value = process.env[varName]
    if (!value || value.includes('your-')) {
      coreMissing.push(varName)
      console.log(`  ❌ ${varName}: MISSING`)
    } else {
      console.log(`  ✅ ${varName}: Configured`)
    }
  })
  
  console.log('\n🌟 Enhanced Features:')
  requiredVars.optional.forEach(varName => {
    const value = process.env[varName]
    if (!value || value.includes('your-')) {
      optionalMissing.push(varName)
      console.log(`  🟡 ${varName}: Not configured (optional)`)
    } else {
      console.log(`  ✅ ${varName}: Configured`)
    }
  })
  
  // Summary
  console.log('\n📊 Setup Status Summary:')
  
  if (essentialMissing.length === 0) {
    console.log('  ✅ Essential: All configured - App will start')
  } else {
    console.log(`  ❌ Essential: ${essentialMissing.length} missing - App may not work`)
    console.log(`     Missing: ${essentialMissing.join(', ')}`)
  }
  
  if (coreMissing.length === 0) {
    console.log('  ✅ Authentication: All configured - Full login features available')
  } else {
    console.log(`  🟡 Authentication: ${coreMissing.length} missing - Some login methods disabled`)
    console.log(`     Missing: ${coreMissing.join(', ')}`)
  }
  
  console.log(`  🌟 Enhanced: ${requiredVars.optional.length - optionalMissing.length}/${requiredVars.optional.length} configured`)
  
  // Recommendations
  console.log('\n🎯 Next Steps:')
  
  if (essentialMissing.length > 0) {
    console.log('  1. 🚨 CRITICAL: Configure essential variables in .env.local')
    console.log('     - Copy .env.example to .env.local')
    console.log('     - Update MONGODB_URI, JWT_SECRET, JWT_REFRESH_SECRET')
  } else if (coreMissing.length > 0) {
    console.log('  1. 📧 Configure email/SMS for OTP features:')
    if (coreMissing.includes('SMTP_USER') || coreMissing.includes('SMTP_PASS')) {
      console.log('     - Setup Gmail App Password for email OTP')
    }
    if (coreMissing.some(v => v.startsWith('TWILIO'))) {
      console.log('     - Setup Twilio account for SMS OTP')
    }
  } else {
    console.log('  1. 🚀 Your setup is complete! Start the app with: npm run dev')
    console.log('  2. 🌟 Consider adding Google OAuth for enhanced login')
  }
  
  console.log('  📚 See SETUP_MANUAL.md for detailed instructions')
  
  // Test database connection if configured
  if (!essentialMissing.includes('MONGODB_URI')) {
    console.log('\n🗄️ Testing database connection...')
    testDatabaseConnection()
  }
}

async function testDatabaseConnection() {
  try {
    // Skip database test if MongoDB not available in development
    console.log('  🔄 Database test skipped (install mongodb package to test)')
    console.log('     💡 The app will test connection automatically when you start it')
  } catch (error) {
    console.log('  ❌ Database: Connection test unavailable')
    console.log('     💡 The app will test connection when you run npm run dev')
  }
}

// Run validation
if (require.main === module) {
  // Load environment variables manually
  const fs = require('fs')
  const path = require('path')
  
  try {
    const envPath = path.join(__dirname, '.env.local')
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf8')
      envFile.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=')
        if (key && !key.startsWith('#') && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim()
        }
      })
      console.log('📁 Loaded environment from .env.local\n')
    } else {
      console.log('⚠️  No .env.local file found. Copy .env.example to .env.local first.\n')
    }
  } catch (error) {
    console.log('⚠️  Could not load .env.local file\n')
  }
  
  validateSetup()
}

module.exports = { validateSetup }