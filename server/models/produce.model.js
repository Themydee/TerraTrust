import mongoose from "mongoose"


const produceSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        variety:{
            type: String,
        },
        quantity:{
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"],
        },  
        availableQuantity: {
            type: Number,
            default: function () {
              return this.quantity;
            },
        },
        unit:{
            type: String,
            default: "kg",
        },
        price:{
            type: Number,
        },
        harvestDate:{
            type: Date,
        },
        certifications:{
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: ["available", "sold"],
            default: "available",
          },
        createdAt:{
            type: Date,
            default: Date.now,
        }

    }
);

export const Produce = mongoose.model("Produce", produceSchema);