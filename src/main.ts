import { bootstrapCameraKit, createMediaStreamSource } from "@snap/camera-kit";


(async function setupLens() {
    const apiToken = import.meta.env.VITE_SNAP_API;
    const cameraKit = await bootstrapCameraKit({ apiToken, logger: 'console' });
    console.log("bootstrappedCameraKit", cameraKit);
    const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
    // liveRenderTarget.style.height = window.innerHeight + 'px';
    const session = await cameraKit.createSession({ liveRenderTarget });

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment',width: { ideal: window.innerWidth },
      height: { ideal: window.innerHeight }, }, 
    });
    

    const source = createMediaStreamSource(mediaStream, {
      cameraType: 'environment',
    });
    setTimeout(() => {
      const track = mediaStream.getVideoTracks()[0];
      const { width, height } = track.getSettings();
    
      source.setRenderSize(width || window.innerWidth, height || window.innerHeight);
    }, 100);


    await session.setSource(source);
    await session.play();

    const lens = await cameraKit.lensRepository.loadLens(
      import.meta.env.VITE_LENS_ID,
      import.meta.env.VITE_LENS_GROUP_ID
    );
    await session.applyLens(lens);
    console.log("loaded lens", lens);

})();

