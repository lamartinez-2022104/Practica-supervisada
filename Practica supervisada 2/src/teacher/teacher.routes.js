'use strict'

import express from 'express'
import {
    isAdmin,
    validateJwt
} from '../middlewares/validate-jwt.js'
import { login, register, test, update, deleteT } from './teacher.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/register',[validateJwt, isAdmin], register)
api.post('/login',login)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteT)

export default api