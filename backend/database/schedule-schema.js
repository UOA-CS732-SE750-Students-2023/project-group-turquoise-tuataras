import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
    Monday: {type: Schema.Types.ObjectId, ref: 'Recipe'},
    Tuesday: {type: Schema.Types.ObjectId, ref: 'Recipe'},
    Wednesday: {type: Schema.Types.ObjectId, ref: 'Recipe'},
    Thursday: {type: Schema.Types.ObjectId, ref: 'Recipe'},
    Friday: {type: Schema.Types.ObjectId, ref: 'Recipe'},
    Saturday: {type: Schema.Types.ObjectId, ref: 'Recipe'},
    Sunday: {type: Schema.Types.ObjectId, ref: 'Recipe'}

});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export { Schedule };