import Shayari from "../models/Shayari.js";

const addShayari = async (req, res) => {

    const { content } = req.body;
    const author = req.user._id;

    try {

        const shayari = new Shayari({
            author,
            content,
           
        });

        await shayari.save();

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