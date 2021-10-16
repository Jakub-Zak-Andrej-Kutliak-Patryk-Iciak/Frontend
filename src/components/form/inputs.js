import { Form, Input } from 'semantic-ui-react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { ErrorMessage } from '@hookform/error-message'


export const InputHook = ({
                            name,
                            label,
                            labelColor = "white",
                            placeholder = label,
                            rules,
                            onChange = () => {},
                            onBlur = () => {},
                            defaultValue,
                            type = "text",
                            style = {}
                          }) => {
  const { control, clearErrors, formState: { errors } } = useFormContext()
  const getError = () => errors[name]


  const defVal = defaultValue === null || defaultValue === undefined ? '' : defaultValue

  return (
    <Form.Field error={ getError() !== undefined }>
      { label && <label style={ { color: labelColor } }>{ label }</label> }


      <Controller control={ control }
                  render={ ({ field }) => (
                    <Input value={ field.value }
                           autoComplete='off'
                           placeholder={ placeholder }
                           style={style}
                           onChange={ (event) => {
                             field.onChange(event)
                             onChange(event, event.target)
                             clearErrors()
                             return event
                           } }
                           onBlur={ () => {
                             field.onBlur()
                             onBlur()
                           } }
                           type={type}
                    />
                  ) }
                  rules={ rules }
                  name={ name }
                  defaultValue={ defVal }
      />
      <ErrorMessage errors={ errors }
                    name={ name }
                    render={ () => (
                      <div className='ui basic red pointing prompt label transition visible'>
                        { errors[name].message }
                      </div>
                    ) }
      />
    </Form.Field>
  )
}

InputHook.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
}
