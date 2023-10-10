import * as mongoose from 'mongoose'

interface IUser {
    username: string,
    email: string,
    password: string,
    phoneno: number,
    createddate: Date,
    updateddate: Date
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        validate: {
            validator: function (val: string){
                return val && val?.length > 3
            },
            message: (props) => `username should be atlease 6 letters` 
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneno: {
        type: Number,
        required: true
    },
    createddate: {
        type: Date,
        required: true
    },
    updateddate: {
        type: Date,
        required: true
    }
})

export const  User = mongoose.model<IUser>('user', userSchema)