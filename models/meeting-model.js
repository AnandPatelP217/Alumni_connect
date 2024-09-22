const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructuring Schema from mongoose

const meetingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    url: { type: String, required: false },
    platform: { type: String, required: false },
    location: { type: String, required: false },
    feedback: { type: String, required: false },
    attendedstudent: { type: String, required: false },
    alumni_id: { type: Schema.Types.ObjectId, ref: 'Alumni', required: true },
    attendees: [
        {
            studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
            isAttending: { type: Boolean },
        },
    ], // Adding attendee votes to the schema
});

const Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = Meeting;
