import { Schema as _Schema, model } from "mongoose";
import { findByIdAndUpdate } from './Counter';

const Schema = _Schema;

const candidateSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  id: { type: Number, required: true },
  message: { type: String, required: true },
  img: { data: Buffer, contentType: String }
});

candidateSchema.pre("save", function(next) {
  findByIdAndUpdate({_id: 'candidateId'}, {$inc: { seq: 1} }).then((idCounter) => {
      this.id = idCounter.seq;
      next();
  }).catch((error) => {
    if(error){
      return next(error);
    }
  })
});


export default model("Candidate", candidateSchema);