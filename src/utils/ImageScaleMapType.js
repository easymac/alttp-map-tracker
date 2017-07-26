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

  generateTile(tileCoord, zoom) {
    const tileArea = this.tileSize.width / this.scaleFactor[zoom];
    const offsetX = tileCoord.x * tileArea;
    const offsetY = tileCoord.y * tileArea;

    const resCanvas = document.createElement('canvas');
    resCanvas.width = this.tileSize.width;
    resCanvas.height = this.tileSize.height;
    const resContext = resCanvas.getContext('2d');
    resContext.imageSmoothingEnabled = false;

    // If painting out of bounds
    if (
      (offsetX < 0 || offsetY < 0) ||
      (offsetX >= this.canvas.width || offsetY >= this.canvas.height)
    ) {
      // If Map Type is supplied a base image
      if (this.base) {
        resContext.drawImage(
          this.baseCanvas, 0, 0, tileArea, tileArea,
          0, 0, resCanvas.width, resCanvas.height
        );
      }
    } else {
      resContext.drawImage(
        this.canvas, offsetX, offsetY, tileArea, tileArea,
        0, 0, resCanvas.width, resCanvas.height
      );
    }

    return resCanvas;
  }

  getTile(tileCoord, zoom) {
    return this.generateTile(tileCoord, zoom);
  }
}
