import APPLICATION  from "../../app";

import * as mongoose from 'mongoose'


// const MONGOOSE = APPLICATION.MONGOOSE
// console.log('APPLICATION.getMongoose()',APPLICATION.getMongoose())

const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
})

export const TestCollection = mongoose.model('cl_test_1', TestSchema)

