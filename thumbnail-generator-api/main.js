const sharp = require("sharp");

let inputFile = "alice.jpg"

dimensions = [{
  width: 400,
  height: 300
}, {
  width: 160,
  height: 120
}, {
  width: 120,
  height: 120
}];

function resize(image, dimensions) {
  const {width, height}  = dimensions;
  const ext = 'jpg';

  sharp(image).resize(dimensions).toFile(`output-${width}x${height}.${ext}`)
    .then(function() {
      console.log("Created");
    })
    .catch(function(err) {
      console.log("Error")
    })
}


dimensions.forEach(d => {
  resize(inputFile, d);
});