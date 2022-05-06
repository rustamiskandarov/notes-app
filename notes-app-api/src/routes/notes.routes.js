const {Router} = require('express')
const config = require('config')
const Note = require('../models/Note')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', auth, async (req, res) => {
	
  try {
    const {note} = req.body
    const existing = await Note.findOne({ title: note })
    if (existing) {
      return res.json({ note: existing })
    }

    const newNote = new Note({
      title: note, text: note, owner: req.user.userId
    })

	  await newNote.save()
    res.status(201).json({ link: note })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user.userId })
    res.json(notes)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    res.json(note)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
