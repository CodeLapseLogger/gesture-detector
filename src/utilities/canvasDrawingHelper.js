// Mapping of each finger to its respective landmark numbers
const fingerJointLandmarkMapping = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

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
      const x = detectedHandLandmarkData[handLandmarkEntryIndex][0]; // Entry is an array of size 3: [x, y, z]
      const y = detectedHandLandmarkData[handLandmarkEntryIndex][1];

      // Draw the landmark as a circle on 2D (don't need z co-ordinate) canvas context
      canvas2DContext.beginPath();
      canvas2DContext.arc(x, y, 5, 0, 3 * Math.PI);

      // Fill color
      canvas2DContext.fillStyle = "#7a36aa";
      canvas2DContext.fill();
    }
  });
};
