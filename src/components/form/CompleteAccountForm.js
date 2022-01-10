import { Form } from "semantic-ui-react";
import { FormProvider, useForm } from "react-hook-form";
import { InputHook, RadioHook } from "./inputs";
import { required, birthday } from "./validations";
import PropTypes from "prop-types";
import { AppButton } from "../";
import AppLink from "../link/AppLink";
import { useStore } from "../../store/StoreProvider";
import { useHistory } from "react-router-dom";


const CompleteAccountForm = ({ onSubmit }) => {

  const genderOptions = ["MALE", "FEMALE", "OTHER"]
  const { setStoreItem } = useStore()
  const { push } = useHistory()

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
    <div className="py-4 px-8 mx-auto text-left">
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
            <RadioHook name="gender"
                       items={ genderOptions.map(item => ({
                         name: item.toLowerCase(),
                         label: item.toLowerCase(),
                         value: item
                       })) }
                       label="Gender"
                       rules={ {
                         validate: {
                           isRequired: required,
                         }
                       } }
                       itemStyle={ { color: "white" } }
                       inline
            />
            {/* TODO: radio buttons here with options: man, women, other */ }
          </div>
          <div className="pt-12">
            <AppButton text="Save"/>
          </div>
          <div className={"m-auto max-w-sm text-xs flex justify-center mt-5"}>
            <AppLink text={"Finish later"} path={'/map'}/>
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