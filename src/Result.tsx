import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

interface ResultProps {
  onStartOver: () => void;
  results: string[];
}
export const Result = ({ onStartOver, results }: ResultProps) => {
  return (
    <Box>
      <Typography>Generated {results.length} images</Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" onClick={onStartOver}>
            Start Over
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
