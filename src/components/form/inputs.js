import { Form, FormGroup, Input, Radio } from 'semantic-ui-react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { ErrorMessage } from '@hookform/error-message'
import { get } from "lodash";

const labelColors = ["white", "black"]


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
                           style={ style }
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
                           type={ type }
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
  labelColor: PropTypes.oneOf(labelColors),
  placeholder: PropTypes.string,
  rules: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
}

export const RadioHook = ({
                            name,
                            label,
                            labelColor = "white",
                            items,
                            inline,
                            rules,
                            onChange = () => {},
                            onBlur = () => {},
                            defaultValue,
                            itemStyle = { color: "white" },
                          }) => {
  const { control, errors } = useFormContext()

  const getError = () => get(errors, name)

  const defVal = defaultValue === null || defaultValue === undefined ? '' : defaultValue

  return (
    <Form.Field error={ getError() !== undefined } inline={ inline }>
      { label && <label style={ { color: labelColor } }>{ label }</label> }

      <Controller control={ control }
                  render={ ({ field }) => (
                    <FormGroup style={ { margin: '.5em', color: "white" } }>
                      { items.map((item, index) => {
                        return <Radio value={ item.value }
                                      className="mx-5 text-white"
                                      key={ index }
                                      name={ item.name }
                                      label={ item.label }
                                      checked={ field.value === item.value }
                                      onChange={ (event, { value }) => {
                                        field.onChange(value)
                                        onChange(event, value)
                                      } }
                                      style={ itemStyle }
                                      onBlur={ () => {
                                        field.onBlur()
                                        onBlur()
                                      } }
                        />
                      })
                      }
                    </FormGroup>
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
RadioHook.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string,
  labelColor: PropTypes.oneOf(labelColors),
  rules: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string,
  inline: PropTypes.bool,
  itemStyle: PropTypes.object,
}
