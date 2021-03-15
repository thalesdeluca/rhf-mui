import { Button } from "@material-ui/core";
import { useEffect } from "react";
import * as yup from "yup";
import Input from "../../components/Input";
import { Form, LocationContainer, RangeContainer } from "./styles";

export const validationSchema = yup.object().shape({
  technologies: yup.array(),
  rangeXP: yup.array().length(2).required("Please select a range of experiences"),
  city: yup.object(),
  state: yup.object()
})

export const initialValues = {
  state: null,
  city: null,
  rangeXP: [0, 12],
  technologies: [],
  isRemote: false,
}

export const CandidatesForm = (props) => {
  const { form: { handleSubmit, onSubmit, control, watch } } = props;
  const { data: { technologies, states, cities } } = props;
  const rangeXP = watch("rangeXP", [0, 12])
  const isRemote = watch("isRemote", false);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <LocationContainer>
        <Input 
          control={control} 
          type="select" 
          name="state"
          options={states?.data} 
          getOptionSelected={(option) => option.id} 
          getOptionLabel={(option) => option.sigla}
          disabled={isRemote || states.loading }
          inputProps={{
              label: "UF"
          }}
        />

        <Input 
          control={control} 
          type="select" 
          name="city"
          options={cities?.data} 
          getOptionSelected={(option) => option.id} 
          getOptionLabel={(option) => option.nome}
          disabled={isRemote || cities.loading || !cities.data?.length}
          fullWidth
          inputProps={{
            label: "Cidade",
          }}
        />

      </LocationContainer>

      <Input 
        control={control} 
        type="checkbox" 
        name="isRemote"  
        checked={isRemote}
        label="Remoto?"
        color="primary"
      />

    <LocationContainer>
      <Input 
        control={control} 
        type="select" 
        name="technologies"  
        multiple
        options={technologies?.data} 
        getOptionSelected={(option) => option.id} 
        getOptionLabel={(option) => option.name}
        fullWidth
        inputProps={{
          label: "Tecnologias"
        }}
      />

      <RangeContainer>
        <span>{rangeXP?.[0]}</span>
    
        <Input 
            control={control} 
            type="slider" 
            name="rangeXP"  
            defaultValue={[0, 12]}
            marks
            step={1}
            min={0}
            max={12}
            getOptionSelected={(option) => option.id} 
            getOptionLabel={(option) => option.name}
            valueLabelDisplay="auto"
            inputProps={{
              label: "Idade"
            }}

          />

        <span>{rangeXP?.[1]}</span>
      </RangeContainer>

      </LocationContainer>

      <Button variant="contained" color="primary" type="submit">Buscar</Button>
    </Form>
  )
}