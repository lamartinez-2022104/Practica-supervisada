'use strict'

import Clase from './class.model.js'

export const test = (req, res) => {
    return res.send('Prueba Clase')
}

export const save = async (req, res) => {
    try {
        let data = req.body
        let clase = new Clase(data)
        await clase.save()
        return res.send({ message: 'class saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving class' })
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body

        let updateClass = await Clase.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateClass) return res.status(401).send({ message: 'Class not found and not update' })
        return res.send({ message: 'Update class', updateClass })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating class' })
    }
}

export const deleteClass = async(req,res)=>{
    try {
        let {id} = req.params
        let deleteC = await Clase.findOneAndDelete({_id:id})
        if(!deleteC) return res.status(400).send({message: 'Class not found and not deleted'})
        return res.send({message:`Class deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting class'})
    }
}

export const get = async(req, res)=>{
    try {
        let clases = await Clase.find()
        return res.send({clases})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting classes'})
    }
}

