import mongoose, { Schema } from "mongoose";

const imageSchema = new mongoose.Schema({
    name: String,
    type: String,
    data: Buffer
});

export const Image = mongoose.model('Image', imageSchema);
