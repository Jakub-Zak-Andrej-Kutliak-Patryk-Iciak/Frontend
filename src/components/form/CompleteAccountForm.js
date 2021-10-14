import { Form } from "semantic-ui-react";
import { FormProvider, useForm } from "react-hook-form";
import { InputHook } from "./inputs";
import { required, birthday } from "./validations";
import PropTypes from "prop-types";


const CompleteAccountForm = ({ onSubmit }) => {

  const useFormMethods = useForm({ mode: 'onBlur' })
  const {
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    errors,
    control,
    watch,
    formState,
    reset,
    trigger
  } = useFormMethods

  const onInnerSubmit = async (data) => {
    onSubmit(data);
  }

  return (
    <FormProvider { ...useFormMethods }>
      <Form form={ 'completeAccountForm' } onSubmit={ handleSubmit(onInnerSubmit) }>
        <InputHook name="birthday"
                   label="Date of birth"
                   type="text"
                   placeholder="dd/mm/yyyy"
                   rules={ { required, birthday } }
        />
        {/* TODO: radio buttons here with options: man, women, other */}
      </Form>
    </FormProvider>
  )
}

CompleteAccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CompleteAccountForm