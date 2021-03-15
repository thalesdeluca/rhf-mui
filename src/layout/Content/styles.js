import styled from 'styled-components';
import pattern from "../../assets/spikes.png"

export const Container = styled.main`
  background-color: whitesmoke;
  height: 100vh;
  width: 100vw;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  jusitfy-content: center;

  padding: 20px;

  background: url(${pattern}) repeat;

`;