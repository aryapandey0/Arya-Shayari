import { sendMail } from "../config/email.js";
import Shayari from "../models/Shayari.js";

const addShayari = async (req, res) => {

    const { content, category } = req.body;
    const author = req.user._id;

    try {

        const shayari = new Shayari({
            author,
            content,
            category
        });

        await shayari.save();

        // populate after save
        await shayari.populate("author", "name");

        try {
            await sendMail(
                "aryapandey376@gmail.com",
                "Pending Shayari",
                `Hey ADMIN, You got a new shayari from ${shayari.author.name}`
            );
        } catch (error) {
            console.log("Mail failed but shayari saved");
        }

        res.status(201).json({
            message: "Shayari added successfully",
            shayari
        });

    } catch (err) {

        console.log("Shayari can't be added due to some problems...", err);

        res.status(500).json({
            message: "Couldn't add shayari"
        });
    }
};

export default addShayari;