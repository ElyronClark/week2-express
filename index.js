require('dotenv').config()

const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT
const app = express()


const skills = ["Python", "React", "Node.js", "PostgreSQL", "LangChain"]

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

app.get('/skills', (req, res) => {
    res.json({ skills })
})

app.get('/skills/:id', (req, res) => {
    const skill = skills[req.params.id]
    if (!skill) return res.status(404).json({ error: 'Skill not found'})
    res.json({ skill })
})

app.get('/', (req, res) => {
    res.json({ message: 'API is running' })
})

app.post('/skills', (req, res) => {
    const { skill } = req.body
    if (!skill) return res.status(400).json({ error: 'Skill is required' })
    skills.push(skill)
res.status(201).json({ skills })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})