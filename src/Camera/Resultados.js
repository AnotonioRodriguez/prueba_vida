import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import mask from "../images/maskEscritorio.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  mascara: {
    position: "absolute",
    zIndex: 3,
    height: "75vh",
  },
  imagen: {
    maxHeight: "100%",
  },
}));

function Resultados() {
  const classes = useStyles();

  return (
    <Fragment>
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
            </section>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ p: 0.5, width: "50%" }}>
                <Button
                  color="error"
                  variant="contained"
                  fullWidth
                  sx={{ borderRadius: 50 }}
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
                  component={Link}
                  to='/camera'
                  style={{ color: "black", background: "white" }}
                  sx={{ borderRadius: 50 }}
                >
                  Volver a capturar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}

export default Resultados;
