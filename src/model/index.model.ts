import { TestCollection } from './test/test'
import { User } from './user/user'
import mongoose from 'mongoose'


const DB = {

    TestCollection,
    User
} as Record<string, typeof mongoose.Model>

export default DB

