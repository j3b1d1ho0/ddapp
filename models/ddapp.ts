
import * as mongoose from 'mongoose';

export interface ISubMap {
    name:string,
    description:string
}


export interface IMap extends mongoose.Document {
    name:string,
    category:string,
    description:string,
    image:string,
    rating:number,
    submaps:ISubMap[]
}

let subMapSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description: { 
        type:String,
        required:true
    }
})


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
    },
    submaps: [subMapSchema]

});

export default mongoose.model<IMap>('Map', mapSchema);


