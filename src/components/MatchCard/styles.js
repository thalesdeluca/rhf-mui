import { Card as MUICard, Chip as MUIChip, Typography as MUITypography } from "@material-ui/core";
import styled from "styled-components";


export const Card = styled(MUICard)`
  padding: 20px;
  max-width: 300px;
  min-width: 250px;
  min-height: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  transition: all 0.8s ease;
  transform: scale(1);

  &:hover {
    transform: scale(1.05);
    transition: all 0.6s ease;
  }
`

export const Chip = styled(MUIChip)`
  margin: 2px;
`;

export const Typography = styled(MUITypography)`
  font-size: 12px;
  opacity: 0.8;
`;