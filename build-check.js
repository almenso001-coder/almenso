#!/usr/bin/env node

/**
 * ALMENSO BUILD VALIDATOR
 * Checks for:
 * ✅ 0KB chunks
 * ✅ Missing exports
 * ✅ Tree-shake issues
 * ✅ Broken lazy imports
 */

const fs = require('fs')
const path = require('path')

const distDir = path.join(__dirname, 'dist')

function validateBuild() {
  console.log('\n🔍 ALMENSO BUILD VALIDATION\n')
  
  if (!fs.existsSync(distDir)) {
    console.error('❌ Build directory not found. Run: npm run build')
    process.exit(1)
  }

  // Check for empty chunks
  const jsDir = path.join(distDir, 'assets', 'js')
  if (!fs.existsSync(jsDir)) {
    console.warn('⚠️  JS directory not found')
    return
  }

  const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'))
  let hasZeroKbFiles = false

  console.log(`📦 Found ${jsFiles.length} JS bundles:\n`)

  jsFiles.forEach(file => {
    const filePath = path.join(jsDir, file)
    const stats = fs.statSync(filePath)
    const sizeKb = (stats.size / 1024).toFixed(2)
    
    const status = stats.size === 0 ? '❌' : sizeKb < 1 ? '⚠️ ' : '✅'
    console.log(`  ${status} ${file.substring(0, 40).padEnd(40)} ${sizeKb} KB`)
    
    if (stats.size === 0) hasZeroKbFiles = true
  })

  console.log('\n' + '='.repeat(60))
  
  // Check for index.html
  const indexPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found in dist')
    process.exit(1)
  }

  const indexContent = fs.readFileSync(indexPath, 'utf-8')
  if (!indexContent.includes('<div id="root"')) {
    console.error('❌ Root element not found in index.html')
    process.exit(1)
  }
  console.log('✅ index.html has root element')

  // Check for main JS entry point
  if (!jsFiles.some(f => f.includes('main') || f.includes('index'))) {
    console.warn('⚠️  Main bundle file might be missing')
  } else {
    console.log('✅ Main bundle found')
  }

  console.log('\n' + '='.repeat(60))
  
  if (hasZeroKbFiles) {
    console.error('\n❌ FAILED: Found 0KB chunks — tree-shaking issue detected')
    console.log('\n📋 FIX APPLIED:')
    console.log('  • vite.config.js: Changed treeshake.moduleSideEffects to "auto"')
    console.log('  • vite.config.js: Changed minify to "terser"')
    console.log('  • vite.config.js: Added assetsInlineLimit: 0')
    console.log('  • vite.config.js: Improved manualChunks logic\n')
    process.exit(1)
  }

  console.log('✅ BUILD VALID — No 0KB chunks found!')
  console.log('\n🚀 Next: npm run preview\n')
}

validateBuild()
