import {Schema, model} from 'mongoose'

const classSchema = Schema({
    name:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    }
})

export default model('class',classSchema)