import { Box } from "@mui/material";
import { StepEnum } from "interface";
import React, { PropsWithChildren } from "react";

interface CustomTabPanelProps extends PropsWithChildren {
  step: StepEnum;
  value: StepEnum;
}
export const CustomTabPanel = ({
  children,
  step,
  value,
  ...other
}: CustomTabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== step}
      id={`simple-tabpanel-${step}`}
      aria-labelledby={`simple-tab-${step}`}
      {...other}
    >
      {value === step && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
