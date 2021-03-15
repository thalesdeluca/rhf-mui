import React from 'react'
import { Card, Chip, Typography } from './styles'

const MatchCard = ({ candidate: { id, technologies, city, state, min_experience, max_experience } }) => {

  const getXP = () => {
    if(max_experience === 0)  {
      return `Experiência: ${min_experience}+ anos`
    }

    return `Experiência: ${min_experience}-${max_experience} anos`;
  }

  return (
    <Card elevation={1} key={id}>
      <Typography gutterBottom>{city} - {state}</Typography>
      <Typography gutterBottom>{getXP()}</Typography>

      <div>  
        {technologies?.sort((prev, actual) => actual.is_main > prev.is_main)?.map(({ name, id, is_main }) => (
          <Chip key={id} size="small" label={name} color={is_main ? 'primary' : "default"}/>
        ))}
      
      </div>

    </Card>
  )
}

export default MatchCard
