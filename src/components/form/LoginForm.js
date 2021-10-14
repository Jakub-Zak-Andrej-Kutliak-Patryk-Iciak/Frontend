import { Form } from "semantic-ui-react";
import { FormProvider, useForm } from "react-hook-form";
import { InputHook } from "./inputs";
import { required, email, password } from "./validations";
import PropTypes from "prop-types";
import AppButton from "../button/AppButton";


const LoginForm = ({ onSubmit }) => {

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
    <div className="max-w-xs p-4 mx-auto text-left">
      <FormProvider { ...useFormMethods }>
        <Form form={ 'loginForm' } onSubmit={ handleSubmit(onInnerSubmit) }>
          <InputHook name="email"
                     label="Email"
                     type="email"
                     placeholder="Type your email"
                     rules={ {
                       validate: {
                         isRequired: required,
                         isValidEmail: email,
                       }
                     } }
          />
          <InputHook name="password"
                     label="Password"
                     type="password"
                     placeholder="Type your password"
                     rules={ {
                       validate: {
                         isRequired: required,
                         isPassword: password,
                       }
                     } }
          />
          <div className="pt-12">
            <AppButton text="Log in"/>
          </div>
        </Form>
      </FormProvider>
    </div>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm