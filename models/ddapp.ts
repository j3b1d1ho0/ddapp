
import * as mongoose from 'mongoose';

export interface IMap extends mongoose.Document {
    name:string,
    category:string,
    description:string,
    image:string,
    rating:number
}

let mapSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    image: {
        type:String,
        required:false,
        default:"https://i.ytimg.com/vi/mRf3-JkwqfU/hqdefault.jpg" 
    },
    rating: {
        type:Number,
        required:false,
        min:0,
        max:10,
        default:0
    }

});

export default mongoose.model<IMap>('Map', mapSchema);


