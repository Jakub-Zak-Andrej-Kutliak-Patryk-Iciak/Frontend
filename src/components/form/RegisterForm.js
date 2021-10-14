import { Divider, Form, Grid } from "semantic-ui-react";
import { FormProvider, useForm } from "react-hook-form";
import { InputHook } from "./inputs";
import { required, email, minLength, password } from "./validations";
import PropTypes from "prop-types";
import AppButton from "../button/AppButton";


const RegisterForm = ({ onSubmit }) => {

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
    if (data.email !== data.confirmEmail) {
      // TODO: print error
      return
    }
    if (data.password !== data.confirmPassword) {
      // TODO: print error
      return
    }
    onSubmit(data);
  }

  return (
    <div className="py-4 px-8 mx-auto text-left">
      <FormProvider { ...useFormMethods }>
        <Form form={ 'registerForm' } onSubmit={ handleSubmit(onInnerSubmit) }>
          <div className="grid md:grid-cols-2 md:gap-8">
            <InputHook name="firstName"
                       label="First name"
                       rules={ {
                         validate: {
                           isRequired: required,
                           isMinLength: minLength,
                         }
                       } }
            />

            <InputHook name="lastName"
                       label="Last name"
                       rules={ {
                         validate: {
                           isRequired: required,
                           isMinLength: minLength,
                         }
                       } }
            />
          </div>
          <Divider/>
          <div className="grid md:grid-cols-2 md:gap-8">
            <InputHook name="email"
                       label="Email"
                       type="email"
                       placeholder="Ex: parking.app@gmail.com"
                       rules={ {
                         validate: {
                           isRequired: required,
                           isValidEmail: email,
                         }
                       } }
            />
            <InputHook name="confirmEmail"
                       label="Confirm email"
                       type="email"
                       placeholder="Repeat the email above"
                       rules={ {
                         validate: {
                           isRequired: required,
                           isValidEmail: email,
                         }
                       } }
            />
          </div>
          <Divider/>
          <div className="grid md:grid-cols-2 md:gap-8">
            <InputHook name="password"
                       label="Password"
                       type="password"
                       placeholder="Type your password"
                       rules={ {
                         validate: {
                           isRequired: required,
                           isPasswordValid: password,
                         }
                       } }
            />
            <InputHook name="confirmPassword"
                       label="Confirm password"
                       type="password"
                       placeholder="Repeat the password above"
                       rules={ {
                         validate: {
                           isRequired: required,
                           isPasswordValid: password,
                         }
                       } }
            />
          </div>
          <div className="pt-12">
            <AppButton text="Register"/>
          </div>
        </Form>
      </FormProvider>
    </div>
  )
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default RegisterForm