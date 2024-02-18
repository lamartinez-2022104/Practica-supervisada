'use strict'

import jwt from 'jsonwebtoken'
import Teacher from '../teacher/teacher.model.js'
import Student from '../student/student.model.js'

export const validateJwt = async (req, res, next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if (!token) return res.status(401).send({ message: 'Unauthorized' })
        let { tid } = jwt.verify(token, secretKey)
        let teacher = await Teacher.findOne({ _id: tid })
        if (!teacher) return res.status(404).send({ message: 'User not found - Unauthorized' })
        req.teacher = teacher
        console.log(req.teacher)
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({ message: 'Invalid token or expired' })
    }
}

export const validateJwtStudent = async (req, res, next) => {
    try {
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if (!token) return res.status(401).send({ message: 'Unauthorized' })
        let { sid } = jwt.verify(token, secretKey)
        let student = await Student.findOne({ _id: sid })
        if (!student) return res.status(404).send({ message: 'User not found - Unauthorized' })
        req.student = student
        console.log(req.student)
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({ message: 'Invalid token or expired' })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        let { role, email } = req.teacher
        if (!role || role !== 'ADMIN') return res.status(403).send({ message: `You dont have acces | email ${email}` })
        next()
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized role' })
    }
}
