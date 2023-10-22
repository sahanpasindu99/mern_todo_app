const mongoose=require('mongoose');
const {Schema}=mongoose

const todoSchema = new Schema({
    email:{
        type:String,
    },
    title:{
        type:String
    },
    date: {
        type: Date,
        default: Date.now(), 
      }

    
},{timestamps:true}
)


const TodoModel=mongoose.model('Todo',todoSchema)

module.exports=TodoModel