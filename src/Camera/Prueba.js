import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

function Prueba({ setDataFoto, dataFoto, handleClickOpen }) {
  const [bl, setbl] = useState(0);
  const [detenerModelos, setDetenerModelos] = useState(false);
  const [verBoton, setverBoton] = useState(false);
  const videoRef = useRef(null);

  var video = document.querySelector("#video"),
    photo = document.querySelector("#photo"),
    canvas = document.querySelector("#canvas"),
    width = 420,
    height = 700;

  const startVideo = () => {
    navigator.getUserMedia(
      { video: {} },
      (stream) => (videoRef.current.srcObject = stream),
      (err) => console.log(err)
    );
  };

  const loadModels = useCallback(async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
        faceapi.nets.faceExpressionNet.loadFromUri("./models"),
      ]);
      startVideo();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handlePlay = () => {
    var canvas_face = document.createElement("canvas");
    canvas_face.width = videoRef.current.width;
    canvas_face.height = videoRef.current.height;
    var ctx_face = canvas_face.getContext("2d");

    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };
    faceapi.matchDimensions(canvas, displaySize);

    var irisC = [];
    let nowBlinking = false;

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      const landmarks = resizedDetections[0].landmarks;
      const landmarkPositions = landmarks.positions;

      var x_ = landmarkPositions[38 - 1].x;
      var y_ = landmarkPositions[38 - 1].y;
      var w_ = landmarkPositions[39 - 1].x - landmarkPositions[38 - 1].x;
      var h_ = landmarkPositions[42 - 1].y - landmarkPositions[38 - 1].y;

      x_ = landmarkPositions[44 - 1].x;
      y_ = landmarkPositions[44 - 1].y;
      w_ = landmarkPositions[45 - 1].x - landmarkPositions[44 - 1].x;
      h_ = landmarkPositions[48 - 1].y - landmarkPositions[44 - 1].y;

      ctx_face.clearRect(0, 0, canvas_face.width, canvas_face.height);
      ctx_face.drawImage(
        videoRef.current,
        0,
        0,
        videoRef.current.width,
        videoRef.current.height
      );
      var frame = ctx_face.getImageData(
        0,
        0,
        videoRef.current.width,
        videoRef.current.height
      );
      var p_ =
        Math.floor(x_ + w_ / 2) +
        Math.floor(y_ + h_ / 2) * videoRef.current.width;
      var v_ = Math.floor(
        (frame.data[p_ * 4 + 0] +
          frame.data[p_ * 4 + 1] +
          frame.data[p_ * 4 + 2]) /
          3
      );

      irisC.push(v_);
      if (irisC.length > 100) {
        irisC.shift();
      }

      let meanIrisC = irisC.reduce(function (sum, element) {
        return sum + element;
      }, 0);
      meanIrisC = meanIrisC / irisC.length;
      let vThreshold = 1.5;

      let currentIrisC = irisC[irisC.length - 1];
      if (irisC.length === 100) {
        if (nowBlinking === false) {
          if (currentIrisC >= meanIrisC * vThreshold) {
            nowBlinking = true;
          }
        } else {
          if (currentIrisC < meanIrisC * vThreshold) {
            nowBlinking = false;
            setbl((x) => x + 1);
          }
        }
      }
    }, 33);
  };

  function takepicture() {
    var canvas_face = document.createElement("canvas");
    canvas_face.width = videoRef.current.width;
    canvas_face.height = videoRef.current.height;
    var context = canvas_face.getContext("2d");
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);

    if (width && height) {
      context.drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL("image/png");
      setDataFoto(data);
    }
  }

  useEffect(() => {
    loadModels();
  }, [loadModels, detenerModelos]);

  useEffect(() => {
    if (bl === 1) {
      takepicture();
      setDetenerModelos(false);
    }
  }, [bl, detenerModelos]);

  const mostrarCamara = () => {
    setverBoton(true);
  };

  // SE ESTA USANDO UN TIMEOUT PARA EL TIEMPO DE MOSTRAR EL BOTON DE TOMA DE FOTOGRAFIA DEBEN SER 30 SEG
  // SE TIENE CONDICIONADO A MENOS POR LAS PRUEBAS
  setTimeout(mostrarCamara, 3000);

  return (
    <Fragment>
      <video
        id="video"
        width="100%"
        height="100%"
        // className="camaraResponsive"
        autoPlay
        muted
        ref={videoRef}
        onPlay={handlePlay}
      ></video>
      <canvas id="canvas"></canvas>
      {verBoton === true ? (
        <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ p: 0.5, width: "50%" }}>
                <Button
                  variant="contained"
                  fullWidth
                  color="error"
                  onClick={() => setbl(1)}
                  style={{ color: "white" }}
                  sx={{
                    borderRadius: 50,
                    border: 1,
                    borderColor: "text.primary",
                  }}
                >
                  Tomar fotografia
                </Button>
              </Box>
            </Box>
        </>
      ) : null}
    </Fragment>
  );
}

export default Prueba;
