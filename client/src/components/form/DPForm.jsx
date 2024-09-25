/* eslint-disable react/prop-types */
import { FormProvider, useForm } from "react-hook-form";

const DPForm = ({ onSubmit, children, defaultValue }) => {
  const formConfig = {};

  if (defaultValue) {
    formConfig["defaultValues"] = defaultValue;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default DPForm;
