const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = config.get('port') || 5000

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/notes', require('./routes/notes.routes.js'))

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			user: config.get('mongoUser'),
			pass: config.get('mongoPassword')
		})
		app.listen(PORT, () => console.log('Server is running on port: ' + PORT))
	} catch (e) {
		console.log('Server Error ', e.message)
		process.exit(1)
	}
}

start()