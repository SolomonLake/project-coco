import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

export const Loading = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      <Grid item>
        <Typography>Loading</Typography>
      </Grid>
    </Grid>
  );
};
