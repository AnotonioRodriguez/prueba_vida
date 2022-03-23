import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Howl } from "howler";
import file from "./Alarm.mp3";
import sonidoColor from "../images/ComponenteSonidoColor.svg";
import sonido from "../images/Componente 1850 – 3.svg";
import mask from "../images/maskEscritorio.svg";
import maskMovil from "../images/Sustracción.png";
import "./styles.css";
import Prueba from "./Prueba";

const useStyles = makeStyles(() => ({
  camara: {
    position: "relative",
    zIndex: 2,
    height: 480,
  },
  camaraMovil: {
    position: "absolute",
    zIndex: 2,
  },
  mascara: {
    position: "absolute",
    zIndex: 3,
    height: 480,
  },
  mascaraMovil: {
    position: "absolute",
    zIndex: 3,
    height: "80vh",
    width: "100%",
  },
  bocina: {
    position: "absolute",
    zIndex: 5,
  },
  bocinaMovil: {
    position: "absolute",
    marginTop: "50%",
    zIndex: 5,
  },
  imagen: {
    height: "100%",
    width: "100%",
  },
  imagenMovil: {
    height: "100%",
    width: "100%",
  },
}));

export default function CameraPrincipal() {
  const classes = useStyles();
  const [colorAudio, setColorAudio] = useState(false);
  const [dataFoto, setDataFoto] = useState(null);
  const [reload, setReload] = useState(false);
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
  };

  // setTimeout(detenerAudio, 7000);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setReload(false);
    // ESTA LINEA COMENTADA SE EJECUTA EN ACCION PARA ACTIVAR DESPUES DE 3 SEGUNDOS LA ALARMA QUE INDICA LA ACCION DEL PARPADEO
    // setTimeout(soundPlay, 3000);
  }, [reload]);

  console.log(dataFoto);

  return (
    <Fragment>
      {/* AQUI COMIENZA LA MANERA RESPONSIVA DE LA TOMA DE FOTOGRAFIA */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={12}>
            {/* CONDICIONAR SI EXISTE UNA IMAGEN GUARDADA DENTRO DEL STATE PARA PODER MOSTRARLA O MOSTRAR SOLO LA CAMARA */}
            {dataFoto !== null ? (
              <Box>
                <img
                  alt="selfieImagen"
                  src={dataFoto}
                  style={{ width: "100%" }}
                />
                {/* <Drawer anchor={"bottom"} open={open} onClose={handleClickOpen}> */}
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
                        onClick={() => {
                          setDataFoto(null);
                          setReload(true);
                        }}
                      >
                        Volver a capturar
                      </Button>
                    </Box>
                  </Box>
                {/* </Drawer> */}
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
                  <Box className={classes.camaraMovil}>
                    <Prueba
                      setDataFoto={setDataFoto}
                      dataFoto={dataFoto}
                      handleClickOpen={handleClickOpen}
                    />
                  </Box>
                  <Box sx={{ marginTop: "135%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <Box>
                        <img src={sonidoColor} alt="sonido" />
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
                        <Typography
                          style={{ color: "black" }}
                          variant="subtitle1"
                        >
                          Cierra los ojos y abrelos consecutivamente al momento de
                          escuchar el sonido del obturador mirando fijamente al ovalo.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </section>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Componente responsivos de escrito */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Grid container direction="row" justifyContent="center">
          <Grid item xl={6} lg={6} sm={7} md={7}>
            <Box>
              <Box sx={{ mt: 2, ml: 2, height: "15vh" }} textAlign="left">
                <Typography variant="h6">Biometricos</Typography>
                <Typography variant="subtitle1">
                  Cierra los ojos y abrelos consecutivamente al momento de
                  escuchar el sonido del obturador mirando fijamente al ovalo.
                </Typography>
              </Box>

              <section className="imagenFondo">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box className={classes.mascara}>
                    <img
                      src={dataFoto === null ? mask : mask}
                      alt="imagenMask"
                      className={classes.imagen}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box className={classes.camara}>
                    {dataFoto === null ? (
                      <Prueba setDataFoto={setDataFoto} dataFoto={dataFoto} />
                    ): (
                      <img
                        id="photo"
                        width={"100%"}
                        src={dataFoto}
                        alt="Imagen"
                      />
                    )}
                  </Box>
                </Box>
                {dataFoto === null ? (
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
                ) : null}
              </section>

              {dataFoto !== null ? (
                <>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{ p: 1, width: "50%", mt: 2 }}>
                      <Button
                        color="error"
                        variant="contained"
                        fullWidth
                        onClick={() => {
                          setDataFoto(null);
                        }}
                        sx={{
                          borderRadius: 50,
                          border: 1,
                          borderColor: "text.primary",
                        }}
                      >
                        Volver a tomar
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
