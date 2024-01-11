import { Box, Container, Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "CustomTabPanel";
import { DetailsForm } from "DetailsForm";
import { Payment } from "Payment";
import { Result } from "Result";
import { DetailsFormValues, PaymentTypesEnum, StepEnum } from "interface";
import React, { useCallback, useMemo, useState } from "react";

const a11yProps = (step: StepEnum) => {
  return {
    id: `simple-tab-${step}`,
    "aria-controls": `simple-tabpanel-${step}`,
  };
};

export const App = () => {
  const [step, setStep] = React.useState(StepEnum.Details);
  const [detailsFormValues, setDetailsFormValues] = useState<DetailsFormValues>(
    {
      paymentType: PaymentTypesEnum.Payment,
      description: "",
      email: "",
    }
  );
  const [results, setResults] = useState<string[]>([]);

  const steps = useMemo(() => {
    return [StepEnum.Details, StepEnum.Payment, StepEnum.Result];
  }, []);

  const handleDetailsFormNext = useCallback((values: DetailsFormValues) => {
    setDetailsFormValues(values);
    setStep(StepEnum.Payment);
  }, []);

  const handlePaymentNext = useCallback(() => {
    if (detailsFormValues.images) {
      const r = [];
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < detailsFormValues.images.length; index++) {
        const file = detailsFormValues.images[index];
        r.push(file.type);
      }
      setResults(r);
    }
    setStep(StepEnum.Result);
  }, [detailsFormValues.images]);

  const handlePaymentBack = useCallback(() => {
    setStep(StepEnum.Details);
  }, []);

  const onStartOver = useCallback(() => {
    setStep(StepEnum.Details);
    setDetailsFormValues({
      paymentType: PaymentTypesEnum.Payment,
      description: "",
      email: "",
    });
  }, []);
  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={steps.indexOf(step)}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              sx: {
                color: ({ palette }) => palette.primary.main,
                background: ({ palette }) => palette.primary.main,
              },
            }}
          >
            {steps.map((s) => (
              <Tab
                key={s}
                sx={{
                  fontWeight: "bold",
                }}
                label={s}
                {...a11yProps(s)}
              />
            ))}
          </Tabs>
        </Box>
        <CustomTabPanel step={StepEnum.Details} value={step}>
          <DetailsForm
            onNext={handleDetailsFormNext}
            initialValues={detailsFormValues}
          />
        </CustomTabPanel>
        <CustomTabPanel step={StepEnum.Payment} value={step}>
          <Payment
            onNext={handlePaymentNext}
            onBack={handlePaymentBack}
            paymentType={detailsFormValues.paymentType}
          />
        </CustomTabPanel>
        <CustomTabPanel step={StepEnum.Result} value={step}>
          <Result onStartOver={onStartOver} results={results} />
        </CustomTabPanel>
      </Box>
    </Container>
  );
};
