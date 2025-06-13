import mongoose from 'mongoose'

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "Course"
    }
})

export const purchaseModel = mongoose.model("Purchase", purchaseSchema);