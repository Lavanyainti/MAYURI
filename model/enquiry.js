const mongoose=require('mongoose')

const enquiryScheema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
   number:{
    type:String,
    required:true
   },
   type:{
    type:String
   },
   message: { type: String },
   projectID:{
    type:mongoose.Schema.Types.ObjectId,
     ref: "Project"
   },
   createdAt: {
    type: Date,
    default: Date.now
  }
})

const enquiry=mongoose.model("Enquiry",enquiryScheema);
module.exports=enquiry;