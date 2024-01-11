import { Formik, Field, FormikHelpers, Form } from "formik";
import React, { useCallback, useMemo } from "react";
import { TextField, Select } from "formik-mui";
import * as yup from "yup";
import { Box, Button, Grid, MenuItem } from "@mui/material";
import { DetailsFormValues, PaymentTypesEnum } from "interface";
import { UpperCasingTextField } from "ImageUpload";

interface DetailsFormProps {
  onNext: (values: DetailsFormValues) => void;
  initialValues: DetailsFormValues;
}

export const DetailsForm = ({ onNext, initialValues }: DetailsFormProps) => {
  const paymentOptions = useMemo(
    () =>
      Object.values(PaymentTypesEnum).map((l) => ({
        label: l,
        value: l,
      })),
    []
  );
  const validationSchema = useMemo(
    () =>
      yup.object({
        paymentType: yup.string().required("Please select payment type"),
        description: yup.string().required("Please provide description"),
        email: yup
          .string()
          .email("Please provide a valid email address")
          .required("Please provide your email address"),
      }),
    []
  );
  const onSubmit = useCallback(
    (
      values: DetailsFormValues,
      formikHelpers: FormikHelpers<DetailsFormValues>
    ) => {
      try {
        formikHelpers.setSubmitting(true);
        onNext(values);
      } catch (error) {
        //
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
    [onNext]
  );

  return (
    <Formik<DetailsFormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ isSubmitting, isValid, values }) => {
        return (
          <Form>
            <Box>
              <Field
                name="email"
                label="Email Address"
                component={TextField}
                type="email"
                placeholder="Your email address"
                fullWidth
                required
              />
            </Box>
            <Box mt={2}>
              <Field
                name="description"
                label="Description"
                component={TextField}
                multiline
                placeholder="What do you want the AI to draw?"
                fullWidth
                required
                rows={5}
              />
            </Box>
            <Box mt={2}>
              <Field
                component={Select}
                formHelperText={{
                  children: "How would you like to pay for the service?",
                }}
                name="paymentType"
                labelId="payment-type-select"
                label="Payment Type"
                fullWidth
                required
              >
                {paymentOptions.map((p) => (
                  <MenuItem key={p.value} value={p.value}>
                    {p.label}
                  </MenuItem>
                ))}
              </Field>
            </Box>
            <Box mt={2}>
              <Field
                component={UpperCasingTextField}
                name="images"
                label="Input Images"
                required
                type="file"
                multiple
                accept="image/*"
                id="file"
              />
            </Box>
            <Box mt={4}>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button
                    variant="contained"
                    disabled={
                      !isValid || isSubmitting || !values.images?.length
                    }
                    type="submit"
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};
