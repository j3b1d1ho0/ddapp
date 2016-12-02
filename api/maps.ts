import * as express from 'express';
import * as mongoose from 'mongoose';
import Map from '../models/ddapp';

let router = express.Router();
 
let maps = [{
  name: "Ravenloft 4",
  category: "isometric",
  description: "A cartoon map of the ins and outs of the mighty castle of Ravenloft, Home to the vampire Count Strahd von Zarovich, and the party's attempts to rid the place of evil.",
  image: "http://dnd.wizards.com/sites/default/files/media/map_ravenloft1.jpg",
  rating: 0
}]

// Map.find({}).remove(() => {
//     maps.map((map, key) => {
//         Map.create(map);
//     });
// });

// Map.find().count().then((results) => {
//   console.log(results);
//     if (results < 1) {
//         Map.create(maps).then((success) => {
//             console.log(success);
//         }).catch((err) => {
//             console.log(err, "error");
//         })
//     }
// }).catch((err) => {
//     console.log(err, "error")
// })

// // get all maps
router.get('/', (req, res) => {
  Map.find().then((maps)=> {
      res.json(maps);
  }).catch((err) => {
      res.status(500);
      console.error(err);
  })
});

// Get a single map by id
router.get('/:id', (req, res) => {
  Map.findById(req.params['id']).then((map) => {
    res.json(map);
  });
});

// Create new map
router.post('/', (req, res) => {
  let map = new Map();
  map.name = req.body.name;
  map.category = req.body.category;
  map.description = req.body.description;
  map.image = req.body.image;
  map.rating = req.body.rating; 

  // save new map
  map.save().then((newMap) => {
    res.json(newMap);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// Update existing map
router.post('/:id', (req, res) => {
  let mapId = req.params.id;

  Map.findById(mapId).then((map) => {
    map.name = req.body.name;
    map.category = req.body.category;
    map.description = req.body.description;
    map.image = req.body.image;
    map.rating = req.body.rating;


    map.save().then((updatedMap) => {
      res.json(updatedMap);
    }).catch((err) => {
      res.status(400).json(err);
    });

  }).catch(() => {
    res.sendStatus(404);
  });

});


// Delete map
router.delete('/:id', (req, res) => {
  let mapId = req.params.id;
  Map.remove({_id:mapId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

export default router;