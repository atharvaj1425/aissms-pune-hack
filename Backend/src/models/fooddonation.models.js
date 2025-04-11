import mongoose, { Schema } from "mongoose";

const foodDonationSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true
    }, 
    expiryDate: {
        type: Date,
        required: true,
    },
    schedulePickUp: {
        type: Date,
        required: true,
    },
    restaurantPincode: {
        type: Number,
       // requiured: true
    },
    restaurantName: {
        type: String,
        //required: true,
    },
    restaurantUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // volunteer: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Volunteer"
    // },
    acceptedById: {
        type: String
    },
    acceptedBy: {
        type: String 
    },
    status: { 
        type: String, 
        enum: ["Pending", "Accepted", "Arrival for Pick Up", "Out for Delivery", "Delivered", "Expired"], 
        default: "Pending" 
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    }
}, {
    timestamps: true
})

foodDonationSchema.pre("save", async function (next) {
    if (this.isModified("status") && this.status === "Delivered") {
        try {
            // Add points to the donor
            const donor = await User.findById(this.restaurantUser);
            if (donor) {
                donor.redeem_points = (donor.redeem_points || 0) + 5;
                await donor.save();
            }

            // Add points to the volunteer if applicable
            if (this.acceptedById) {
                const volunteer = await User.findById(this.acceptedById);
                if (volunteer && volunteer.role === "volunteer") {
                    volunteer.redeem_points = (volunteer.redeem_points || 0) + 5;
                    await volunteer.save();
                }
            }

            if (this.acceptedById) {
                const ngo = await User.findById(this.acceptedById);
                if (ngo && ngo.role === "ngo") {
                    ngo.redeem_points = (ngo.redeem_points || 0) + 5;
                    await ngo.save();
                }
            }
        } catch (error) {
            console.error("Error adding points:", error);
            next(error);
        }
    }
    next();
});

export const FoodDonation = mongoose.model("FoodDonation", foodDonationSchema)