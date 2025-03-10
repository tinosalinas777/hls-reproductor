solo falta servicio server web, dentro de la carpeta proyecto HLS ejecutar "python -m http.server 9090" para poder ver el index.html en el navegador visitando 
http://localhost:9090/
el programa cuenta con su propio servidor RTMP, asi que podemos usar una app como larix para transmitir video a "rtmp://IP_servidor:1935/test", por defecto el archivo 
script.js lee el path "test" para reproducir el video.
