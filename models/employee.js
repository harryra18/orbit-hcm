const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  hireDate: Date,
  status: { type: String, enum: ['Active','PreStart','Terminated'], default: 'PreStart' },
  name: { type: String, required: true },
  employeeNumber: { type: String, required: true, unique: true },
  payClass: { type: String, enum: ['Full Time','Part Time','Contractor','Intern'] },
  payType: { type: String, enum: ['Salary','Hourly'] },
  department: { type: String, enum: ['Human Resources','Finance','Information Technology','Sales','Marketing','Management'] },
  jobTitle: String,
  imageUrl: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Termination details
  terminationReason: {
    type: String,
    enum: [
      'Unsatisfactory Performance',
      'Work Load',
      'Culture',
      'Misconduct',
      'Business Direction',
      'Retirement',
      'Personal',
      'Medical',
      'Divestiture'
    ],
    default: null
  },
  terminationDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
