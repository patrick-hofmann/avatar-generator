/**
 * Script to extract SVG paths from @opeepsfun/open-peeps React components
 * and convert them to JSON format for use in Vue
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OPEN_PEEPS_PATH = join(__dirname, '../node_modules/@opeepsfun/open-peeps/build')
const OUTPUT_PATH = join(__dirname, '../app/assets/open-peeps')

// Extract path data from React component file
async function extractPaths(filePath) {
  const content = await readFile(filePath, 'utf-8')

  // Extract config
  const configMatch = content.match(/export var (\w+)Config = ({[\s\S]*?});/)
  if (!configMatch) return null

  const configStr = configMatch[2]
    .replace(/(\w+):/g, '"$1":')
    .replace(/'/g, '"')

  let config
  try {
    config = JSON.parse(configStr)
  } catch {
    console.error(`Failed to parse config in ${filePath}`)
    return null
  }

  // Extract path elements
  const paths = []
  const pathRegex = /React\.createElement\("path",\s*{\s*d:\s*'([^']+)',\s*fill:\s*(\w+)\s*}\)/g
  let match
  while ((match = pathRegex.exec(content)) !== null) {
    paths.push({
      d: match[1],
      fill: match[2]
    })
  }

  // Extract default props
  const defaults = {}
  const defaultsRegex = /var _\w = _a\.(\w+),\s*(\w+) = _\w === void 0 \? "([^"]+)" : _\w/g
  while ((match = defaultsRegex.exec(content)) !== null) {
    defaults[match[1]] = match[3]
  }

  return {
    name: config.name,
    width: config.width,
    height: config.height,
    viewBox: config.viewBox,
    props: config.props?.map(p => p.name) || [],
    defaults,
    paths
  }
}

async function extractCategory(category, subPath = '') {
  const categoryPath = join(OPEN_PEEPS_PATH, category, subPath)
  const files = await readdir(categoryPath)
  const items = {}

  for (const file of files) {
    if (file === 'index.js' || !file.endsWith('.js')) continue

    const name = file.replace('.js', '')
    const data = await extractPaths(join(categoryPath, file))
    if (data) {
      items[name] = data
    }
  }

  return items
}

async function main() {
  console.log('Extracting Open Peeps SVG data...')

  // Create output directory
  await mkdir(OUTPUT_PATH, { recursive: true })

  // Extract each category
  const categories = {
    'body-standing': await extractCategory('body', 'standing'),
    'body-sitting': await extractCategory('body', 'sitting'),
    'body-effigy': await extractCategory('body', 'effigy'),
    'head': await extractCategory('head'),
    'face': await extractCategory('face'),
    'beard': await extractCategory('beard'),
    'accessory': await extractCategory('accessory')
  }

  // Write to JSON files
  for (const [name, data] of Object.entries(categories)) {
    const outputFile = join(OUTPUT_PATH, `${name}.json`)
    await writeFile(outputFile, JSON.stringify(data, null, 2))
    console.log(`  Written ${outputFile} (${Object.keys(data).length} items)`)
  }

  // Create index file with all options
  const index = {
    bodyStanding: Object.keys(categories['body-standing']),
    bodySitting: Object.keys(categories['body-sitting']),
    bodyEffigy: Object.keys(categories['body-effigy']),
    head: Object.keys(categories['head']),
    face: Object.keys(categories['face']),
    beard: Object.keys(categories['beard']),
    accessory: Object.keys(categories['accessory'])
  }

  await writeFile(join(OUTPUT_PATH, 'index.json'), JSON.stringify(index, null, 2))
  console.log(`  Written index.json`)

  console.log('Done!')
}

main().catch(console.error)
