import React, { useState } from 'react'
import MUIAutocomplete  from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const Autocomplete = ({ inputProps = {}, ...props }) => {
  const [value, setValue] = useState(props?.defaultValue || props?.multiple ? [] : null);

  const onChange = (event, data, reason, selected) => {
    if(!props.multiple) {
      return props.onChange(event, data, reason, selected)
    }


    if(reason === "remove-option" && !value.includes(selected?.option)) {
      setValue([...value, selected.option])
      return props.onChange(event, [...value, selected.option], reason, selected)
    }
    
    if(reason === "remove-option") {
      setValue(value.filter((item) => item?.id !== selected?.option?.id))
      return props.onChange(event, data, reason, selected)
    }

    setValue(data)
    return props.onChange(event, data, reason, selected)
  }

  return (
    <MUIAutocomplete 
      {...props} 
      clearOnBlur={false} 
      key={props.options}
      value={value} 
      onChange={onChange} 
      renderInput={(params) => <TextField variant="filled" {...inputProps} {...params} />} 
    />
  )
}

export default Autocomplete
