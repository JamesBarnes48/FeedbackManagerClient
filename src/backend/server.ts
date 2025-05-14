import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
console.info(__filename);
console.info(__dirname)

// Serve static files from dist
app.use(express.static(path.join(__dirname, '../../dist')))

// Example API route
app.get('api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' })
})

// Fallback for client-side routing (Vue Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})