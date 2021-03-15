import axios from 'axios';
import React, { useCallback, useState } from 'react'

export const CandidatesContext = React.createContext();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const INIT_CANDIDATES = {
  loading: false,
  data: [],
  error: null,
}

const CandidatesProvider = ({ children }) => {
  const [candidates, setCandidates] = useState(INIT_CANDIDATES);
  const [dirty, setDirty] = useState(false);
 
  const loadCandidates = useCallback(async (params) => {
    try {
      const { data, status } = await api.get(`${process.env.REACT_APP_API_CANDIDATES}`, {
        params,
      })
      if(status === 200 && data) {
        setCandidates({
          loading: false,
          data,
          error: null,

        });
        setDirty(true);
      }
    } catch(err) {
      console.log(err);
      setCandidates({
        ...INIT_CANDIDATES,
        error: err?.response?.data || err
      })
    }
  }, [])

  return (
    <CandidatesContext.Provider value={{ candidates: { ...candidates, dirty }, loadCandidates }}>
      {children}
    </CandidatesContext.Provider>
  )
}

export default CandidatesProvider;