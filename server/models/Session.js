import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        cart: [{
            courseId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Course", 
                required: true
            }, 
            quantity: {
                type: Number,
                default: 1
            }
        }], 
        expiry: {
            type: Date,
            expires: 3600
        }
    }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session; 