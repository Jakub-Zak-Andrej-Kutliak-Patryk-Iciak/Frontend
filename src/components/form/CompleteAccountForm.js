import { Form } from "semantic-ui-react";
import { FormProvider, useForm } from "react-hook-form";
import { InputHook } from "./inputs";
import { required, birthday, password } from "./validations";
import PropTypes from "prop-types";
import { isNumber } from "lodash";
import AppButton from "../button/AppButton";


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
    <div className="py-4 px-8 mx-auto text-left border">
      <FormProvider { ...useFormMethods }>
        <Form form={ 'completeAccountForm' } onSubmit={ handleSubmit(onInnerSubmit) }>
          <div className="grid md:grid-cols-2 md:gap-8">
            <InputHook name="birthday"
                       label="Date of birth"
                       type="text"
                       placeholder="dd/mm/yyyy"
                       rules={ {
                         validate: {
                           isRequired: required,
                           isBirthday: birthday,
                         }
                       } }
                       style={ { width: '110px' } }
            />
            {/* TODO: radio buttons here with options: man, women, other */ }
          </div>
            <div className="pt-12">
              <AppButton text="Save"/>
            </div>
        </Form>
      </FormProvider>
    </div>
  )
}

CompleteAccountForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CompleteAccountForm