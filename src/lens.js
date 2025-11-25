import { bootstrapCameraKit } from "@snap/camera-kit";


(async function setupLens() {
    const apiToken = "Your API Token value copied from the Camera Kit Portal";
    const cameraKit = await bootstrapCameraKit({ apiToken, logger: 'console' });
    console.log("bootstrappedCameraKit", cameraKit);
})();