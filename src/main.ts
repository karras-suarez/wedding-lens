import { bootstrapCameraKit } from "@snap/camera-kit";


(async function setupLens() {
    const apiToken = import.meta.env.VITE_SNAP_API;
    const cameraKit = await bootstrapCameraKit({ apiToken, logger: 'console' });
    console.log("bootstrappedCameraKit", cameraKit);
    const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
    liveRenderTarget.style.height = window.innerHeight + 'px';
    const session = await cameraKit.createSession({ liveRenderTarget });

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    await session.setSource(mediaStream);
    await session.play();

    const lens = await cameraKit.lensRepository.loadLens(
      import.meta.env.VITE_LENS_ID,
      import.meta.env.VITE_LENS_GROUP_ID
    );
    await session.applyLens(lens);
    console.log("loaded lens", lens);

})();

