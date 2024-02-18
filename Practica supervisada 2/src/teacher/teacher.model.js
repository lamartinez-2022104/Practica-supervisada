import { Schema, model } from 'mongoose'

const teacherSchema = Schema({
    name:{
        type: String,
        required: true
    },

    surname:{
        type: String,
        required: true
    },

    age:{
        type: String,
        minlegth: 2,
        maxlegth: 2,
        required: true
    },

    subject:{
        type: Schema.Types.ObjectId,
        ref: 'class',
        required: true
    },

    role:{
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'STUDENT'],
        required: true
    },

    email:{
        type: String,
        required: true, 
        required: true,
        lowercase: true,
        required: true,
    },

    password: {
        type: String,
        minLength: [8, 'Password must be 8 chactars'],    
        required: true
    }
    


})

export default model('teacher', teacherSchema)