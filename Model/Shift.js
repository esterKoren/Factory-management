const mongoose = require('mongoose');

// יצירת סכמה של משמרת
const ShiftSchema = new mongoose.Schema({
  Date: { type: Date, required: true },
  StartingHour: { type: Number, required: true },
  EndingHour: { type: Number, required: true },
  WorkersOnShift: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employee' }]
});

// יצירת מודל משמרות
const shiftModel = mongoose.model('shift', ShiftSchema);

module.exports = { shiftModel };
