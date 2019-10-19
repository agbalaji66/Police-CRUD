const mongoose = require('mongoose');
var policeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    chrime: {
        type: String
    },
    station: {
        type: String
    },
    city: {
        type: String
    }
});
mongoose.model('police', policeSchema);