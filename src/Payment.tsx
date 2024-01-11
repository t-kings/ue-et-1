import { Box, Button, Grid, Typography } from "@mui/material";
import { PaymentTypesEnum } from "interface";
import React from "react";

interface PaymentProps {
  onNext: () => void;
  onBack: () => void;
  paymentType: PaymentTypesEnum;
}
export const Payment = ({ onNext, onBack, paymentType }: PaymentProps) => {
  return (
    <Box>
      {paymentType === PaymentTypesEnum.Ad ? (
        <Typography>Show Ad</Typography>
      ) : null}
      {paymentType === PaymentTypesEnum.Payment ? (
        <Typography>Request payment</Typography>
      ) : null}
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onNext}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
