import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { createConfig, attachRouting } from 'express-zod-api'
import { v1Routes } from './routes/v1/index'
import { v2Routes } from './routes/v2/index'
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World with TypeScript!' })
})

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Express-zod-api configuration and routing
const config = createConfig({
  app,
  cors: true,
  logger: { level: 'debug', color: true },
})

// Attach express-zod-api routes
attachRouting(config, {
  api: {
    v1: v1Routes,
    v2: v2Routes,
  },
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
