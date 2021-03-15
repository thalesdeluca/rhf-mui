import React from 'react'
import CandidatesProvider from './contexts/CandidatesContext';
import IBGEProvider from './contexts/IbgeContext';
import TechnologyProvider from './contexts/TechnologiesContext';
import HomeScreen from './screen';

const Home = () => (
  <IBGEProvider>
    <TechnologyProvider>
      <CandidatesProvider>
        <HomeScreen />
      </CandidatesProvider>
    </TechnologyProvider>
  </IBGEProvider>
)

export default Home;
