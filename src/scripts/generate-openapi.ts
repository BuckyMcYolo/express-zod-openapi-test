import { writeFileSync } from 'fs'
import { join } from 'path'
import { createConfig, Documentation } from 'express-zod-api'
import { v1Routes } from '../routes/v1/index'
import { v2Routes } from '../routes/v2/index'

async function generateOpenApiSpec() {
  try {
    console.log('🚀 Generating OpenAPI specification...')

    // Create express-zod-api configuration
    const config = createConfig({
      cors: true,
      logger: { level: 'debug', color: true },
    })

    // Define the routing structure
    const routing = {
      v1: v1Routes,
      v2: v2Routes,
    }

    // Generate OpenAPI schema using Documentation
    const documentation = new Documentation({
      routing,
      config,
      version: '1.0.0',
      title: 'Express TypeScript OpenAPI',
      serverUrl: process.env.SERVER_URL || 'http://localhost:3000',
      composition: 'inline', // optional: 'inline' or 'components'
    })

    const openApiSchema = documentation.getSpecAsYaml()

    // Write to file
    const outputPath = join(process.cwd(), 'openapi.yaml')
    writeFileSync(outputPath, openApiSchema)

    console.log('✅ OpenAPI specification generated successfully!')
    console.log(`📄 File saved to: ${outputPath}`)
    console.log(`📋 Total endpoints: ${countEndpoints(openApiSchema)}`)

    // Also generate YAML version if needed
    if (process.argv.includes('--yaml')) {
      const yamlPath = join(process.cwd(), 'openapi.yaml')
      writeFileSync(yamlPath, documentation.getSpecAsYaml())
      console.log(`📄 YAML version saved to: ${yamlPath}`)
    }
  } catch (error) {
    console.error('❌ Error generating OpenAPI specification:', error)
    process.exit(1)
  }
}

function countEndpoints(schema: any): number {
  if (!schema.paths) return 0

  let count = 0
  for (const path in schema.paths) {
    for (const method in schema.paths[path]) {
      if (
        ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].includes(
          method,
        )
      ) {
        count++
      }
    }
  }
  return count
}

// Run the generator
generateOpenApiSpec()
