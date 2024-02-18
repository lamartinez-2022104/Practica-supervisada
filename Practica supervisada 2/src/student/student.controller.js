'use strict'
import Student from './student.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req,res) =>{
    return res.send('Prueba Student')
}

export const register = async (req,res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'STUDENT'
        let student = new Student(data)
        await student.save()
        return res.send({message:  'registered successfully' })
    }  catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering student', err })
    }
}

export const login = async (req, res)=>{
    try {
        let{email, password} = req.body
        let student = await Student.findOne({email})
        if(student && await checkPassword(password, student.password)){
            let loggedStudent ={
                sid: student._id,
                email: student.email,
                name: student.name,
                role: student.role
            }
            let token = await generateJwt(loggedStudent)
            return res.send({ message: `Welcome ${student.name}`, loggedStudent, token })
        }
        return res.status(404).send({message: 'Invalid Credencials'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'failed to login'})
    }
}

export const update = async (req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update)return res.status(400).send({message:'Have submitted some data that cannot be update or missing data'})

        let updateStudent = await Student.finOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        ).populate('subject',['name', 'description'])
        if (!updateStudent) return res.status(401).send({ message: 'Student not found and not update' })
        return res.send({ message: 'Update user', updateStudent })
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating account'})
        
    }
}

export const deleteS = async(req,res)=>{
    try {
        let {id} = req.params
        let deletedStudent = await Student.finOneAndDelete({_id: id})
        if (!deletedStudent) return res.status(404).send({ message: 'Student not found and not deleted' })
        return res.send({ message: `Student with username ${deletedStudent.name} deleted successfully` })
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'Error deleting student'})
    }
}

export const search = async (req, res) =>{
    try {
        let {search} = req.body
 
        let subject = await Student.find(
            {name: search}
        ).populate('subject',['name', 'description'])
 
        //Validar la respuesta
        if(subject.leght == 0) return res.status (404).send({message: 'Class not found'})
 
        //Rsponder si todo sale bien
        return res.send({message:'Class found', subject})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error serching class'})
    }
}

