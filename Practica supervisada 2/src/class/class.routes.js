'use Strict'

import express from 'express'
import { deleteClass, get, save, test, update } from './class.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/save', save)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteClass)
api.get('/get', get)

export default api
