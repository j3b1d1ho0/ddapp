
import * as mongoose from 'mongoose';

export interface ITag {
    name:string
}


export interface IMap extends mongoose.Document {
    name:string,
    category:"Dungeon" | "NPC" | "World",
    description:string,
    image:string,
    rating:number,
    tags:ITag[]
}

let TagSchema = new mongoose.Schema({
    name:{type:String}
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
        default:"http://kingofwallpapers.com/dwarf/dwarf-012.jpg" 
    },
    rating: {
        type:Number,
        required:false,
        min:0,
        max:10,
        default:0
    },
    tags: [TagSchema]

});

export default mongoose.model<IMap>('Map', mapSchema);


