import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import "./styles.css";

import { Howl, Howler } from "howler";
import file from "./rave_digger.mp3";
import sonidoColor from '../images/ComponenteSonidoColor.svg'; 
import sonido from "../images/Componente 1850 – 3.svg";
import rec from "../images/Grupo 1078.svg";
import mask from "../images/maskEscritorio.svg";
import maskMovil from "../images/Sustracción.png";
import elipse from "../images/Elipse.svg";
import reverso from "../images/reverso.png";

const useStyles = makeStyles(() => ({
  camara: {
    position: "relative",
    zIndex: 2,
    height: "75vh",
  },
  camaraMovil: {
    position: "relative",
    zIndex: 2,
    height: "100%",
  },
  mascara: {
    position: "absolute",
    zIndex: 3,
    height: "75vh",
  },
  mascaraMovil: {
    position: "absolute",
    zIndex: 3,
    height: "64vh",
    width: "100%",
  },
  elipse: {
    position: "absolute",
    zIndex: 4,
    marginTop: "5%",
  },
  elipseMovil: {
    position: "absolute",
    zIndex: 4,
    marginTop: "27%",
  },
  bocina: {
    position: "absolute",
    zIndex: 5,
  },
  contenedorElipse: {
    display: "flex",
    justifyContent: "center",
  },
  imagen: {
    maxHeight: "100%",
  },
  imagenMovil: {
    height: "100%",
    width: "100%",
  },
}));

export default function CameraPrincipal() {
  const classes = useStyles();
  const [visibleButton, setVisibleButton] = useState(false);
  const [playVideo, setPlayVideo] = useState(true);
  const [colorAudio, setColorAudio] = useState(false);
  const [open, setOpen] = useState(false);

  let video = document.querySelector("#video");
  let canvas = document.querySelector("#canvas");
  let photo = document.querySelector("#photo");

  let height = "100%";
  let width = "100%";

  const Sounds = new Howl({
    src: [file],
  });

  const soundPlay = () => {
    Sounds.play();
    setColorAudio(true); 
    console.log('REPRODUCE'); 
  };

  const detenerAudio = () => {
    Sounds.stop();
    setColorAudio(false); 
    console.log('DETENER'); 
  };

  
  setTimeout(detenerAudio, 7000);

  function mostrarCamara() {
    setVisibleButton(true);
  };

  setTimeout(mostrarCamara, 8000);

  const handleClickOpen = () => {
    setOpen(!open);
  };


  const startVideo = () => {
    setPlayVideo(true);
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webKitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getUserMedia(
      { video: true },
      (stream) => {
        video = document.getElementsByClassName("app__videoFeed")[0];
        canvas = document.getElementById("canvas");
        photo = document.getElementById("photo");
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  //   const stopVideo = () => {
  //     setPlaying(false);
  //     video = document.getElementsByClassName("app__videoFeed")[0];
  //     video.srcObject.getTracks()[0].stop();
  //   };

  // function clearphoto() {
  //   var context = canvas.getContext('2d');
  //   context.fillStyle = "#AAA";
  //   context.fillRect(0, 0, canvas.width, canvas.height);

  //   var data = canvas.toDataURL('image/png');
  //   photo.setAttribute('src', data);
  // }

  // function takepicture() {
  //   canvas.width = width;
  //   canvas.height = height;
  //   canvas.getContext('2d').drawImage(video, 0, 0, width, height);
  //   var data = canvas.toDataURL('image/png');
  //   photo.setAttribute('src', data);
  // }

  useEffect(() => {
    // startVideo();
    // soundPlay();
    // setTimeout(soundPlay, 3000);
  }, []);

  return (
    <Fragment>
        {/* <Button onClick={() => soundPlay(!play)}>play</Button> */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={12}>
            <section className="imagenFondo">
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box className={classes.mascaraMovil}>
                  <img
                    src={maskMovil}
                    alt="imagenMask"
                    className={classes.imagenMovil}
                  />
                </Box>
              </Box>

              {/* <Box className={classes.contenedorElipse}>
                <Box className={classes.elipseMovil}>
                  <img
                    src={elipse}
                    alt="imagenMask"
                    style={{ height: "36vh", width: '100%' }}
                  />
                </Box>
              </Box> */}

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box className={classes.camaraMovil}>
                  <video
                    height={height}
                    width={width}
                    muted
                    autoPlay
                    className="app__videoFeed"
                  ></video>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                {/* {} */}
                <Box className={classes.bocina}>
                  <img src={sonido} alt="sonido" />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Box>
                  <Typography style={{ color: "white" }} variant="subtitle1">
                    Cierra los ojos y abrelos al momento de escuchar el sonido
                    del obturador
                  </Typography>
                </Box>
              </Box>
            </section>

            <Box
              sx={{ display: "flex", alignItems: "flex-end", height: "20vh" }}
              className="fondoButtons"
            >
              <Box sx={{ flexGrow: 1, paddingLeft: 8 }}>
                {visibleButton === true ? (
                  <IconButton onClick={handleClickOpen}>
                    <img alt="reverso" src={rec} />
                  </IconButton>
                ) : null}
              </Box>
              <Box>
                <IconButton>
                  <img alt="reverso" src={reverso} />
                </IconButton>
              </Box>
            </Box>

            <Drawer anchor={"bottom"} open={open} onClose={handleClickOpen}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ p: 0.5, width: "80%" }}>
                  <Button
                    color="error"
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 50 }}
                    onClick={handleClickOpen}
                  >
                    Aceptar
                  </Button>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ p: 0.5, width: "80%" }}>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to="/camera"
                    style={{ color: "black", background: "white" }}
                    sx={{ borderRadius: 50 }}
                    onClick={handleClickOpen}
                  >
                    Volver a capturar
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </Grid>
        </Grid>
      </Box>

      {/* Componente responsivos de escrito */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Grid container direction="row" justifyContent="center">
          <Grid item xl={6} lg={6} sm={7} md={7}>
            <Box sx={{ mt: 2, ml: 2, height: "10vh" }} textAlign="left">
              <Typography variant="h6">Biometricos</Typography>
              <Typography variant="subtitle1">
                Cierra los ojos y abrelos al momento de escuchar el sonido del
                obturador
              </Typography>
            </Box>

            <section className="imagenFondo">
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box className={classes.mascara}>
                  <img src={mask} alt="imagenMask" className={classes.imagen} />
                </Box>
              </Box>

              <Box className={classes.contenedorElipse}>
                <Box className={classes.elipse}>
                  <img
                    src={elipse}
                    alt="imagenMask"
                    style={{ height: "52vh" }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box className={classes.camara}>
                  {/* <video
                    height={height}
                    width={width}
                    muted
                    autoPlay
                    className="app__videoFeed"
                  ></video> */}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Box className={classes.bocina}>
                  <img src={sonido} alt="sonido" />
                </Box>
              </Box>
            </section>

            {visibleButton === true ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ p: 1, width: "50%" }}>
                  <Button
                    color="error"
                    variant="contained"
                    fullWidth
                    // onClick={}
                    component={Link}
                    to="/resultados"
                    sx={{ borderRadius: 50 }}
                  >
                    Tomar Selfie
                  </Button>
                </Box>
              </Box>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
