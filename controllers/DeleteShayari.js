import Shayari from "../models/Shayari.js";

export const deleteShayari = async (req, res) => {

    const { shayariId } = req.params;
    const userId = req.user._id;

    try {

        const toBeDeleted = await Shayari.findById(shayariId);

        if (!toBeDeleted) {
            return res.status(404).json({
                message: "Shayari not found"
            });
        }

        if (toBeDeleted.author.toString() === userId.toString()) {

            await Shayari.findByIdAndDelete(shayariId);

            return res.status(200).json({
                message: "Successfully deleted"
            });
        }

        return res.status(403).json({
            message: "Not Authorized"
        });

    } catch (err) {

        res.status(500).json({
            message: "Could not be deleted"
        });

    }
};