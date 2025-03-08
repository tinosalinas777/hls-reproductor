document.addEventListener("DOMContentLoaded", () => {
  const cameras = [
      { name: 'Camara 1', videoUrl: 'http://localhost:8888/test/index.m3u8', category: 'camaras' },
      { name: 'Camara 2', videoUrl: 'http://localhost:8888/test/index.m3u8', category: 'camaras' },
      { name: 'Camara 3', videoUrl: 'http://localhost:8888/test/index.m3u8', category: 'camaras' },
      { name: 'Camara 4', videoUrl: 'http://localhost:8888/test/index.m3u8', category: 'camaras' },
      { name: 'Microfono', videoUrl: 'http://localhost:8888/test/index.m3u8', category: 'camaras' },
      // ... (mas camaras)
  ];

  const treeView = document.getElementById('tree-view');
  const videoSource = document.getElementById('video-source');
  const videoPlayer = document.getElementById('video');

  // Definir el tamaño fijo del reproductor
  videoPlayer.style.width = "840px";  // Ancho fijo
  videoPlayer.style.height = "560px"; // Alto fijo

  // Crear el arbol de camaras por categorias
  cameras.forEach(camera => {
    const cameraElement = document.createElement('div');
    cameraElement.textContent = camera.name;
    cameraElement.classList.add('camera-item');
    cameraElement.addEventListener('click', () => {
      // Comprobar si la URL es de tipo HLS (.m3u8)
      if (camera.videoUrl.endsWith('.m3u8')) {
        // Usar hls.js para reproducir el video HLS
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(camera.videoUrl);
          hls.attachMedia(videoPlayer);
          hls.on(Hls.Events.MANIFEST_PARSED, function () {
              videoPlayer.play();
          });
        } else if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
          // Si el navegador soporta HLS nativamente (por ejemplo, Safari)
          videoPlayer.src = camera.videoUrl;
          videoPlayer.play();
        }
      } else {
        // Si no es un HLS, simplemente reproducirlo como un archivo normal
        videoSource.src = camera.videoUrl;
        videoPlayer.load();
        videoPlayer.play();
      }
    });

    // Añadir la camara a su categoria correspondiente
    const categoryList = document.getElementById(camera.category);
    categoryList.appendChild(cameraElement);
  });
});
