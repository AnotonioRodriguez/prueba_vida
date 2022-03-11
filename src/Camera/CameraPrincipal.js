import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import Webcam from "react-webcam";
import { makeStyles } from "@mui/styles";
import {Camera} from "react-camera-pro";
import { Howl } from "howler";
import file from "./Alarm.mp3";
import sonidoColor from "../images/ComponenteSonidoColor.svg";
import sonido from "../images/Componente 1850 – 3.svg";
import rec from "../images/Grupo 1078.svg";
import mask from "../images/maskEscritorio.svg";
import maskMovil from "../images/Sustracción.png";
import elipse from "../images/Elipse.svg";
import reverso from "../images/reverso.png";
import "./styles.css";

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
    height: "82vh",
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
    height: "75vh",
  },
  imagenMovil: {
    height: "100%",
    width: "100%",
  },
}));

export default function CameraPrincipal() {
  const classes = useStyles();
  const webcamRef = useRef(null);

  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const [visibleButton, setVisibleButton] = useState(false);
  const [reload, setReload] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [colorAudio, setColorAudio] = useState(false);
  const [open, setOpen] = useState(false);

  const Sounds = new Howl({
    src: [file],
  });

  const soundPlay = () => {
    Sounds.play();
    setColorAudio(true);
  };

  const detenerAudio = () => {
    Sounds.stop();
    setColorAudio(false);
    // ESTAS SON LAS FUNCIONES ENCARGADAS DE TOMAR LAS FOTOGRAFIAS EN CASO DE QUE CUANDO SE TERMINE EL AUDIO
    // O EN CUESTION DE CUANDO SE DETECTA EL PARPADEO
    // setImage(camera.current.takePhoto()) 
    // capture();
  };

  setTimeout(detenerAudio, 7000);

  // FUNCION CONDICIONADA PARA MOSTRAR EL BOTON DE TOMAR FOTOGRAFIA
  function mostrarCamara() {
    setVisibleButton(true);
  };

  // SE ESTA USANDO UN TIMEOUT PARA EL TIEMPO DE MOSTRAR EL BOTON DE TOMA DE FOTOGRAFIA DEBEN SER 30 SEG
  // SE TIENE CONDICIONADO A MENOS POR LAS PRUEBAS
  setTimeout(mostrarCamara, 8000);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  // CON ESTA FUNCION TOMAMOS LA FOTOGRAFIA DE MANERA ESCRITORIO
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);


  useEffect(() => {
    setReload(false);
    // ESTA LINEA COMENTADA SE EJECUTA EN ACCION PARA ACTIVAR DESPUES DE 3 SEGUNDOS LA ALARMA QUE INDICA LA ACCION DEL PARPADEO
    setTimeout(soundPlay, 3000);
  }, [reload]);


  return (
    <Fragment>
      {/* AQUI COMIENZA LA MANERA RESPONSIVA DE LA TOMA DE FOTOGRAFIA */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={12}>
            {/* CONDICIONAR SI EXISTE UNA IMAGEN GUARDADA DENTRO DEL STATE PARA PODER MOSTRARLA O MOSTRAR SOLO LA CAMARA */}
          {image ? (
            <Box>
              <img alt="selfieImagen" src={image} style={{width: '100%'}} />
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
                      style={{ color: "black", background: "white" }}
                      sx={{ borderRadius: 50 }}
                      onClick={()=> {
                        setImage(null)
                        handleClickOpen()
                        setReload(true);
                      }}
                    >
                      Volver a capturar
                    </Button>
                  </Box>
                </Box>
              </Drawer>
            </Box>
          ) : (
            <Box>
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

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Camera 
                      ref={camera} 
                      aspectRatio={1.7/3}
                    />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Box className={classes.bocina}>
                    {colorAudio === false ? (
                      <img src={sonido} alt="sonido" />
                    ) : (
                      <img src={sonidoColor} alt="sonido" />
                    )}
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
                  {/* {visibleButton === true ? ( */}
                    <IconButton onClick={() => {
                      setImage(camera.current.takePhoto())
                      handleClickOpen()
                    }}>
                      <img alt="tomarSelfie" src={rec} />
                    </IconButton>
                  {/* ) : null} */}
                </Box>
                <Box>
                  <IconButton>
                    <img alt="reverso" src={reverso} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Componente responsivos de escrito */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Grid container direction="row" justifyContent="center">
          <Grid item xl={6} lg={6} sm={7} md={7}>
            {imgSrc ? (
              <Box>
                <img alt="selfieImagen" src={imgSrc} />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ p: 0.5, width: "50%" }}>
                    <Button
                      color="error"
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: 50,
                        border: 1,
                        borderColor: "text.primary",
                      }}
                    >
                      Aceptar
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box sx={{ p: 0.5, width: "50%" }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        setImgSrc(null)
                        setReload(true);
                      }}
                      style={{ color: "black", background: "white" }}
                      sx={{
                        borderRadius: 50,
                        border: 1,
                        borderColor: "text.primary",
                      }}
                    >
                      Volver a capturar
                    </Button>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box>
                <Box sx={{ mt: 2, ml: 2, height: "10vh" }} textAlign="left">
                  <Typography variant="h6">Biometricos</Typography>
                  <Typography variant="subtitle1">
                    Cierra los ojos y abrelos al momento de escuchar el sonido
                    del obturador
                  </Typography>
                </Box>

                <section className="imagenFondo">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box className={classes.mascara}>
                      <img
                        src={mask}
                        alt="imagenMask"
                        className={classes.imagen}
                      />
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
                  
                  <Box sx={{ display: "flex", justifyContent: "center"}}>
                    <Box className={classes.camara}>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        height="100%"
                        screenshotFormat="image/jpeg"
                      />
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
                      {colorAudio === false ? (
                        <img src={sonido} alt="sonido" />
                      ) : (
                        <img src={sonidoColor} alt="sonido" />
                      )}
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
                        onClick={capture}
                        sx={{
                          borderRadius: 50,
                          border: 1,
                          borderColor: "text.primary"
                        }}
                      >
                        Tomar Selfie
                      </Button>
                    </Box>
                  </Box>
                ) : null}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
