import express from 'express'
import { getAllInternships, createInternship, updateInternship } from '../controllers/internshipController.js'

const router = express.Router()

router.get('/', getAllInternships)
router.post('/', createInternship)
router.put('/:id', updateInternship)

export default router
