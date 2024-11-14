import mongoose from "mongoose";

const travelStorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    visitedLocation: {
        type: [String],
        default: []
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    visitedDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

export const TravelStory = mongoose.model("TravelStory", travelStorySchema);