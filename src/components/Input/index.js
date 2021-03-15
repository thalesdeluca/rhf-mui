import React from 'react'
import { TextField, Slider, Checkbox, FormControlLabel, InputLabel, Typography }  from '@material-ui/core'
import { Controller } from 'react-hook-form'
import Autocomplete from '../Autocomplete'
import { FormControl } from './styles'


const INPUT_TYPES = {
  "select": (params) => <Autocomplete 
    {...params}
    onChange={(_, data, ) => params.onChange(data)}
  />,
  "text": (params) => <TextField variant="filled" {...params} />,
  "slider": (params) => (
    <>
      <Typography gutterBottom>{params?.inputProps?.label}</Typography>
      <Slider 
        {...params}   
        fullWidth
        onChange={(_, data) => params.onChange(data)}
      />
    </>
  ),
  "checkbox": (params) => <FormControlLabel control={<Checkbox {...params} onChange={(_, data) => params.onChange(data)}/> } label={params.label} />
}

const Input = ({ control, name, type = "text", fullWidth = false, ...props }) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <Controller as={INPUT_TYPES[type]} name={name} control={control} {...props} />
    </FormControl>
    
  )
}



export default Input
