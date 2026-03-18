import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://shibildevtech_db_user:2tur8NK2FQVy3MEV@cluster0.mszgnz0.mongodb.net/MediCare",
    )
    .then(() => {
      console.log("DB connected");
    });
};
