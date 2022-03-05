import React, { Fragment, useRef, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import mask from "../images/maskEscritorio.svg";
import { Link } from "react-router-dom";
import { Camera } from "react-camera-pro";

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
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const classes = useStyles();

  return (
    <Fragment>
        <Box p={5}>
          <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>
          <img src={image} alt='Taken photo'/>
        </Box>
        <Box width={500}>
          <Camera 
            ref={camera} 
            aspectRatio={16/9}
          />
        </Box>
        
    </Fragment>
  );
}

export default Resultados;
