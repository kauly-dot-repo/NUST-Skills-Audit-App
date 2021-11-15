const {model, Schema} = require("mongoose");

const skills = {
  skill_name: String,
  emp_rating: Number,
  sup_rating: Number
};

const employee = new Schema({
  staffnumber: {type:String, required: true},
  firstname: {type:String, required: false},
  lastname: {type:String, required: false},
  email: {type:String, required: true},
  password: {type:String, required: true},
  field: {type:String, required: true}, //category
  department: {type:String, required: true}, 
  supervisor: {type: Boolean, default: false},
  jobTitle: {type:String, required: true}, 
});

// model("table/collection name", objects to be stored in the table/collection )
module.exports = model('employee', employee);