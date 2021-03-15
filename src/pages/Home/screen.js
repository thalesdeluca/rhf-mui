import { Button, CircularProgress, MenuItem, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import Content from '../../layout/Content';
import { IBGEContext } from './contexts/IbgeContext';
import { TechnologyContext } from './contexts/TechnologiesContext';
import { CandidatesContext } from './contexts/CandidatesContext';
import { yupResolver } from "@hookform/resolvers/yup";
import { CandidatesForm, initialValues, validationSchema } from './form';
import { Card, ResultContainer } from './styles';
import MatchCard from '../../components/MatchCard';


const HomeScreen = () => {
  const { control, handleSubmit,  watch, setValue } = useForm({ 
    mode: "onChange",  
    defaultValue: initialValues,
    resolver: yupResolver(validationSchema)
  });
  const { cities, states, loadStates, loadCities } = useContext(IBGEContext);
  const { technologies, loadTechnologies } = useContext(TechnologyContext);
  const { candidates: { loading, data, error, dirty }, loadCandidates } = useContext(CandidatesContext);
  const stateSelected = watch("state", null);
  const citySelected = watch("city", null)


  useEffect(() => {
    loadStates();
    loadTechnologies();
  }, [loadStates, loadTechnologies])

  useEffect(() => {
    if(stateSelected) {
      setValue("city", null)
      loadCities(stateSelected.id)
    }
  }, [stateSelected, loadCities, setValue])



  const onSubmit = (values) => {
    const locationParams = !values.isRemote ? {
      city: values.city?.nome,
      state: values.state?.sigla,
    } : {};

    const params = {
      ...locationParams,
      min_xp: values.rangeXP?.[0],
      max_xp: values.rangeXP?.[1],
      techs: values?.technologies?.map(({ name }) => name)
    }

    loadCandidates(params)
  }

  const renderResults = () => {
    if(dirty && !data?.matches.length) {
      return (
        <Card elevation={3}>
          <Typography>Candidatos não encontrados com os parâmetros buscados</Typography>
        </Card>
      )
    }

    if(loading) {
      return <CircularProgress size={64} color="primary" />
    }

    return data?.matches?.map((item) => (
      <MatchCard {...item} />
    ));
  }


  return (
    <Content>
      <Card elevation={6}>
        <CandidatesForm
          {...{
            form: {
              onSubmit,
              handleSubmit,
              control,
              watch,
            },
            data: {
              technologies,
              states,
              cities
            }
          }}
        />
      </Card>
      
      <ResultContainer>
        {renderResults()}
      </ResultContainer>
    </Content>
  );
}

export default HomeScreen
