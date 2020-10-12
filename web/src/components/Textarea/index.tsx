import React, { TextareaHTMLAttributes } from 'react'

import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

const Input: React.FC<TextareaProps> = ({ label, name, ...rest }) => (
  <div className="textarea-block">
    <label htmlFor={name}>{label}</label>
    <input id={name} {...rest} />
  </div>
)

export default Input
