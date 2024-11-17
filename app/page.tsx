"use client";

import { Toolbar } from "@mui/material";
import { Container, Grid } from "@mui/system";

export default function Home() {
  return (
    <Container component={"main"}>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid size={2}></Grid>
          <Grid size={5}></Grid>
          <Grid size={5}></Grid>
        </Grid>
      </Toolbar>
    </Container>
  );
}
