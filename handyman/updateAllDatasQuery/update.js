const mongoose = require('mongoose');
const connectDb = async () => {
    const uri = 'mongodb+srv://development:handyman@handyman.6xgqpor.mongodb.net/developement';
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

const craftsmanSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userDb", // Assuming you have a User model
            required: true,
        },
        services: [{ type: String }],
        company_name: { type: String, required: true, unique: true },
        documents: [
            {
                document_type: {
                    type: String,
                    enum: ["trade_licence", "craft_card"],
                },
                document_link: { type: String },
            },
        ],
        images: [{ type: String }],
        description: { type: String },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
        status: {
            type: String,
            enum: ["verified", "unverified", "declined"],
            default: "unverified",
        },
        message: String,
        current_subscription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscription",
        },
    },
    { timestamps: true }
);
const Craftsman = mongoose.model("Craftsman", craftsmanSchema);
const dummyText = `We offer professional and high-quality handyman services. Contact us for a quote and to get your project started.`;
const correctDescriptions = async () => {
    try{
     
    await connectDb();
    const updated = await Craftsman.updateMany({}, { $set: { description: dummyText } })   
    console.log(updated)
    }
    catch(error){
        console.log(error)
    }


}

// correctDescriptions()