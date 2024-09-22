const mongoose = require('mongoose');
const { Schema } = mongoose;

const vacancySchema = new Schema({
  position: { type: String, required: true }, 
  company: { type: String, required: true }, 
  location: { type: String, required: true }, 
  salary: { type: String, required: false }, 
  requirements: { type: [String], required: false }, 
  alumni_id: { type: Schema.Types.ObjectId, ref: 'Alumni', required: true }, 
  description: { type: String, required: false }, 
  // status: {
  //   type: String,
  //   enum: ['open', 'closed', 'pending'],
  //   default: 'pending',
  // },
  enrolled_students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student',
  }],
  recommended_students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student',
  }],
});

module.exports = mongoose.model('Vacancy', vacancySchema);
