import React from 'react'
import { TextField } from '@mui/material'
import { TextFieldCustomProps } from './text-field-custom.model'

const TextFieldCustom = (props: TextFieldCustomProps) => {
    const { placeholder, ...rest } = props
    return <TextField fullWidth size="small" variant='outlined' placeholder={placeholder} {...rest} />
}
export default TextFieldCustom