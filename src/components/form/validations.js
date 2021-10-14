import isNumber from "lodash/isNumber";

export const messages = {
  required: 'This field is required',
  minLength: (length) => `Needs to be at least of length ${length} characters`,
  maxLength: (length) => `Needs to be at most of length ${length} characters`,
  email: 'Invalid email',
  password: 'Password needs to fulfil criteria below',
  birthday: 'Birthday does not have required format of dd/mm/yyyy',
}

export const required = value => value || isNumber(value) ? undefined : messages.required
export const minLength = min => value => value && value.length < min ? messages.minLength(min) : undefined
export const maxLength = max => value => value && value.length > max ? messages.maxLength(max) : undefined
export const email = value => value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? messages.email : undefined
export const password = value => value ? undefined : messages.password
export const birthday = value => value ? messages.birthday : undefined