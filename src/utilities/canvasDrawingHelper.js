export const drawHandMesh = (detectedHandData, canvas2DContext) => {
  // Return if there is no data to process
  if (detectedHandData.length === 0) {
    return;
  }

  // Has single array entry, typically.
  detectedHandData.forEach((detectedHandDataEntry) => {
    const detectedHandLandmarkData = detectedHandDataEntry.landmarks; // array with 21 entries

    // Highlight each landmark in the video feed by
    // drawing it in the input canvas context.
    for (
      let handLandmarkEntryIndex = 0;
      handLandmarkEntryIndex < detectedHandLandmarkData.length;
      handLandmarkEntryIndex++
    ) {
      // Get x, y co-ordinates of landmark (ignoring z)
      const [x, y] = detectedHandLandmarkData[handLandmarkEntryIndex]; // Entry is an array of size 3: [x, y, z]

      // Draw the landmark as a circle on 2D (don't need z co-ordinate) canvas context
      canvas2DContext.beginPath();
      canvas2DContext.arc(x, y, 5, 0, 2 * Math.PI);

      // Fill color
      canvas2DContext.fillStyle = "#7a36aa";
      canvas2DContext.fill();
    }
  });
};
