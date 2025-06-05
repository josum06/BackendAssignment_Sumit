import mongoose from 'mongoose';


// chapter schema 
const chapterSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  chapter: { type: String, required: true }, 
  class: { type: String, required: true },   
  unit: { type: String, required: true },
  yearWiseQuestionCount: {
    type: Map,
    of: Number,
    required: true
  },
  questionSolved: { type: Number, required: true },
  status: { type: String, required: true },
  isWeakChapter: { type: Boolean, required: true }
}, { timestamps: true });

export default mongoose.model("Chapter", chapterSchema);
