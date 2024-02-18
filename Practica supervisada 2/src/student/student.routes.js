'use strict'

import express from 'express'
import {
    isAdmin,
    validateJwt
} from '../middlewares/validate-jwt.js'
import {deleteS, login, register, search, test, update} from './student.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/register', [validateJwt, isAdmin],register)
api.post('/login',login)
api.put('/update',[validateJwt, isAdmin], update)
api.delete('/delete', [validateJwt, isAdmin], deleteS)
api.get('/search', search)


export default api