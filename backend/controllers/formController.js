import formModel from '../models/formModel.js';

const form = async (req, res) => {
    const { name, rollno, department, phoneno, guests, arrivalDate, departureDate, arrivalTime } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Photo is required' });
        }
        const newRequest = new formModel({
            name: name,
            rollno: rollno,
            department: department,
            phoneno: phoneno,
            photo: req.file.filename,
            guests: guests,
            arrivalDate: arrivalDate,
            departureDate: departureDate,
            arrivalTime: arrivalTime
        });
        const request = await newRequest.save();
        res.json({ success: true, message: 'Successfully form submitted' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

export { form };
