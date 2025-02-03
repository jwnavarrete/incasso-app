import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useAuthContext } from "@/modules/auth/context/authContext";
import { useFormContext } from "react-hook-form";

const ActionButtons: React.FC = () => {
  const { step, signUpData, handleNext, handleBack, updateUserSignUpData, updateCompanySignUpData } =
    useAuthContext();

  const { handleSubmit } = useFormContext();

  const handleSaveStep = (data: any) => {
    if (step === 0) {
      updateUserSignUpData(data);
      handleNext();
    }

    if (step === 1) {
      updateCompanySignUpData(data);
      // handleNext();
    }
  };

  return (
    <>
      <Grid item xs={4}>
        {step > 0 && (
          <Button
            type="button"
            onClick={handleBack}
            fullWidth
            variant="outlined"
          >
            Back
          </Button>
        )}
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={12} lg={4}>
        <Button
          type="button"
          onClick={handleSubmit(handleSaveStep)}
          fullWidth
          variant="contained"
        >
          Next
        </Button>
      </Grid>

      {/* {JSON.stringify(signUpData)} */}
    </>
  );
};

export default ActionButtons;
