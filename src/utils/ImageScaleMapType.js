export default class ImageScaleMapType {
  constructor(image, base, tileSize, maxZoom, minZoom, name, scaleFactor) {
    this.image = image;
    this.base = base;
    this.tileSize = tileSize;
    this.maxZoom = maxZoom;
    this.minZoom = minZoom;
    this.name = name;

    this.scaleFactor = scaleFactor || {
      0: 0.5,
      1: 1,
      2: 2
    };

    // Store the floor image in a canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.context = this.canvas.getContext('2d');
    // Replace transparent tiles with base texture
    if (base) this.paintBaseLayer(this.canvas, this.context);
    // Paint the floor image
    this.context.drawImage(image, 0, 0);

    if (base) {
      // Store the base texture in a canvas
      this.baseCanvas = document.createElement('canvas');
      // Make the canvas as wide as the widest tile can be
      this.baseCanvas.width = tileSize.width / this.scaleFactor[minZoom];
      this.baseCanvas.height = tileSize.height / this.scaleFactor[minZoom];
      this.baseContext = this.baseCanvas.getContext('2d');
      this.paintBaseLayer(this.baseCanvas, this.baseContext);
    }
  }

  paintBaseLayer(canvas, context) {
    // Cover entire canvas in base tiles
    for (let i = 0; i < canvas.width; i += this.tileSize.width) {
      for (let j = 0; j < canvas.height; j += this.tileSize.height) {
        context.drawImage(this.base, i, j);
      }
    }
  }

  cropImage(tileCoord, zoom) {
    const tileSize = this.tileSize.width / this.scaleFactor[zoom];
    const offsetX = tileCoord.x * tileSize;
    const offsetY = tileCoord.y * tileSize;

    if (
         offsetX < 0 || offsetX >= this.canvas.width
      || offsetY < 0 || offsetY >= this.canvas.height
    ) {
      if (typeof this.base !== 'undefined') {
        return this.baseContext.getImageData(0, 0, tileSize, tileSize);
      }
    }
    return this.context.getImageData(offsetX, offsetY, tileSize, tileSize);
  }

  scaleImageData(imageData, zoom) {

    const scaleFactor = this.scaleFactor[zoom];

    // Put the image data on a canvas so it can be
    // drawn on destCanvas using drawImage
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.width;
    const context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);

    // Add an additional canvas and set the scale before
    // using drawImage
    const destCanvas = document.createElement('canvas');
    destCanvas.width = imageData.width * scaleFactor;
    destCanvas.height = imageData.height * scaleFactor;
    const destContext = destCanvas.getContext('2d');
    destContext.imageSmoothingEnabled = false;
    destContext.scale(scaleFactor, scaleFactor);
    destContext.drawImage(canvas, 0, 0);

    return destContext.getImageData(0, 0, destCanvas.width, destCanvas.height);
  }

  imageDataToURL(imageData) {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
  }

  getTile(tileCoord, zoom) {
    const img = document.createElement('img');
    const cropped = this.cropImage(tileCoord, zoom);
    const scaled = this.scaleImageData(cropped, zoom);
    const url = this.imageDataToURL(scaled);
    img.src = url;
    return img;
  }
}
