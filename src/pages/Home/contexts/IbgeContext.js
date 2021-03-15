import axios from 'axios';
import React, { useCallback, useState } from 'react'

export const IBGEContext = React.createContext();

const api = axios.create({
  baseURL: process.env.REACT_APP_IBGE_URL
})

const INIT_CITY = {
  loading: false,
  data: [],
  error: null
}

const INIT_STATE = {
  loading: false,
  data: [],
  error: null
}

const IBGEProvider = ({ children }) => {
  const [cities, setCities] = useState(INIT_CITY);
  const [states, setStates] = useState(INIT_STATE);

  const loadCities = useCallback(async (stateSelected = "") => {
    try {
      const response = await api.get(`${process.env.REACT_APP_IBGE_STATES}/${stateSelected}${process.env.REACT_APP_IBGE_CITIES}`);

      if(response.status === 200 && response.data) {
        setCities({
          loading: false,
          data: response.data,
          error: null
        })
      }
    } catch(err) {
      console.log(err);
      setCities({
        ...INIT_CITY,
        error: err?.response?.data || err
      })
    }
  }, [])

  const loadStates = useCallback(async () => {
    try {
      const response = await api.get(`${process.env.REACT_APP_IBGE_STATES}`);

      if(response.status === 200 && response.data) {
        setStates({
          loading: false,
          data: response.data,
          error: null
        })
      }
    } catch(err) {
      console.log(err);
      setStates({
        ...INIT_STATE,
        error: err?.response?.data || err
      })
    }
  }, []);

  return (
    <IBGEContext.Provider value={{ cities, states, loadStates, loadCities }}>
      {children}
    </IBGEContext.Provider>
  )
}

export default IBGEProvider;