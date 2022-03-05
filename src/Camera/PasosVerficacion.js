import React, { Fragment } from "react";
import Grid from "@mui/material/Grid";
import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import selfie from "../images/Selfie.svg";
import escritorioSelfie from '../images/MujerConComputadora.svg';


export default function PasosVerficacion() {

  return (
    <Fragment>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Grid container direction="row" justifyContent="center">
          <Grid item lg={3} xs={11} sm={5} md={4}>
            <Box sx={{ p: 1, mt: 2, display: "flex", justifyContent: "center" }}>
              <Typography variant="h6">Biometricos</Typography>
            </Box>
            <Box sx={{ p: 1 }} textAlign="justify">
              <Typography variant="subtitle1">
                Centra el rostro al óvalo,
                <b>
                  cierra los ojos y ábrelos en cuanto el telefono vibre o hasta
                  escuchar el sonido del obturador.{" "}
                </b>
                El rostro debe estar descubierto, sin lentes o gorra.
              </Typography> 
            </Box>
            <Box sx={{ p: 7 }}>
              <img alt="imagen selfie" src={selfie} />
            </Box>
            <Box sx={{ mt: 6}}>
              <Button
                  color="error"
                  variant="contained"
                  fullWidth
                  component={Link}
                  to='/camera'
                  sx={{ borderRadius: 50 }}
              >
                Continuar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Modo responsivo escritorio */}
      <Box sx={{ display: { xs: 'none', sm: 'block' }}}>
        <Grid container direction="row" justifyContent="center">
          <Grid item xl={6} lg={6} sm={7} md={7}>
            <Box sx={{ p: 1, mt: 2, display: "flex", justifyContent: "left" }}>
              <Typography variant="h6">Biometricos</Typography>
            </Box>
            <Box sx={{ p: 1 }} textAlign="justify">
              <Typography variant="subtitle1">
                <b>
                  Centra el rostro al óvalo y acerca el dispositivo cuando se te indique.
                </b>
                El rostro debe estar descubierto, sin lentes y con buena iluminación. Evita hacer gestos dusrante la captura.
              </Typography> 
            </Box>
            <Box sx={{p: 5}}>
              <img alt="imagen selfie" src={escritorioSelfie} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <Box sx={{ width: '60%' }}>
                <Button
                    color="error"
                    variant="contained"
                    fullWidth
                    component={Link}
                    to='/camera'
                    sx={{ borderRadius: 50 }}
                >
                  Continuar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
