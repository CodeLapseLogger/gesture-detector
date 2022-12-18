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

    // Connect finger landmarks with lines between
    // respective pairs of landmarks on canvas
    const fingerNames = Object.keys(fingerJointLandmarkMapping);

    for (let fingerName of fingerNames) {
      // Connect each pair of current finger landmarks
      const currentFingerLandmarks = fingerJointLandmarkMapping[fingerName];
      const currentFingerLandmarkCount = currentFingerLandmarks.length;

      for (
        let currentFingerLandmarkIndex = 0;
        currentFingerLandmarkIndex < currentFingerLandmarkCount - 1;
        currentFingerLandmarkIndex++
      ) {
        const firstLandmarkInThePair =
          currentFingerLandmarks[currentFingerLandmarkIndex];
        const secondLandmarkInThePair =
          currentFingerLandmarks[currentFingerLandmarkIndex + 1];

        // Connect the two landmarks with a canvas line path
        canvas2DContext.beginPath();
        // Move to x, y co-ordinates of first landmark position in the pair
        canvas2DContext.moveTo(
          detectedHandLandmarkData[firstLandmarkInThePair][0],
          detectedHandLandmarkData[firstLandmarkInThePair][1]
        );
        // Draw line to x, y co-ordinates of second landmark position from the first in the pair
        canvas2DContext.lineTo(
          detectedHandLandmarkData[secondLandmarkInThePair][0],
          detectedHandLandmarkData[secondLandmarkInThePair][1]
        );

        // Style the line
        canvas2DContext.strokeStyle = "plum";
        canvas2DContext.lineWidth = 4;
        canvas2DContext.stroke();
      }
    }

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
