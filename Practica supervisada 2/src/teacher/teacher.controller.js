'use strict'
import Teacher from './teacher.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    return res.send('prueba teachers')
}

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'ADMIN'
        let teacher = new Teacher(data)
        await teacher.save()
        return res.send({ message: 'registered successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering teacher', err })
    }
}

export const login = async (req, res) => {
    try {
        let { email, password } = req.body
        let teacher = await Teacher.findOne({ email })
        if (teacher && await checkPassword(password, teacher.password)) {
            let loggedTeacher = {
                tid: teacher._id,
                email: teacher.email,
                name: teacher.name,
                role: teacher.role
            }
            let token = await generateJwt(loggedTeacher)
            return res.send({ message: `Welcome ${teacher.name}`, loggedTeacher, token })
        }
        return res.status(404).send({ message: 'Invalid credentials' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}

export const update = async (req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update)return res.status(400).send({message:'Have submitted some data that cannot be update or missing data'})

        let updateTeacher = await Teacher.finOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('subject',['name', 'description'])
        if (!updateTeacher) return res.status(401).send({ message: 'Teacher not found and not update' })
        return res.send({ message: 'Update user', updateTeacher })
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating account'})
        
    }
}

export const deleteT = async(req,res)=>{
    try {
        let {id} = req.params
        let deletedTeacher = await Teacher.findOneAndDelete({_id: id})
        if (!deletedTeacher) return res.status(404).send({ message: 'Teacher not found and not deleted' })
        return res.send({ message: `Teacher with username ${deletedTeacher.name} deleted successfully` })
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error deleting teacher'})
    }
}


