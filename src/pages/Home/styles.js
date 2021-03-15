import styled from "styled-components";
import { Card as MUICard } from '@material-ui/core';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  width: 80vw;
`;

export const LocationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  >div:nth-child(1) {
    padding-right: 10px;
  }

`;

export const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > span {
    background: whitesmoke;
    border-radius: 4px;
    padding: 16px;
    margin-left: 12px;
    margin-right: 12px;
  }

  div {
    width: 200px;
  }
`;

export const Card = styled(MUICard) `
  padding: 10px;
`;

export const ResultContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  max-width: 90%;

`;