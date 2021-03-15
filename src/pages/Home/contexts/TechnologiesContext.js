import axios from 'axios';
import React, { useCallback, useState } from 'react'

export const TechnologyContext = React.createContext();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const INIT_TECHNOLOGIES = {
  loading: false,
  data: [],
  error: null
}

const TechnologyProvider = ({ children }) => {
  const [technologies, setTechnologies] = useState(INIT_TECHNOLOGIES);
 
  const loadTechnologies = useCallback(async () => {
    try {
      const { data, status } = await api.get(`${process.env.REACT_APP_API_TECHNOLOGIES}`)
      if(status === 200 && data) {
        setTechnologies({
          loading: false,
          data,
          error: null
        })
      }
    } catch(err) {
      console.log(err);
      setTechnologies({
        ...INIT_TECHNOLOGIES,
        error: err?.response?.data || err
      })
    }
  }, [])

  return (
    <TechnologyContext.Provider value={{ technologies, loadTechnologies }}>
      {children}
    </TechnologyContext.Provider>
  )
}

export default TechnologyProvider;