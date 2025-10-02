import { UserModel, StatsModel } from "../models.js";

export default async function check(req, res, next) {
    try {
      
        const user = req.body.user;
        const username = user.fullName;
        const email = user.primaryEmailAddress.emailAddress;

     

        // Use findOneAndUpdate with upsert for atomic operation
        const userDoc = await UserModel.findOneAndUpdate(
            { email: email },
            { 
                $setOnInsert: { 
                    email, 
                    username 
                }
            },
            { 
                upsert: true, 
                new: true,
                runValidators: true 
            }
        );

        // Similarly for stats - atomic operation to prevent duplicates
        await StatsModel.findOneAndUpdate(
            { userId: userDoc._id },
            { 
                $setOnInsert: { 
                    userId: userDoc._id,
                    // any other default stats fields
                }
            },
            { 
                upsert: true, 
                new: true,
                runValidators: true
            }
        );

        next();
    } catch (error) {
       
        res.status(500).json({ 
            message: "Error processing user check",
            error: error.message 
        });
    }
}