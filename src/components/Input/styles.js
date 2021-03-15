import styled from "styled-components";
import { FormControl as MUIFormControl, TextField as MUITextField } from "@material-ui/core";

export const FormControl = styled(MUIFormControl)`
  width: ${({ fullWidth }) => fullWidth ? "100%" : "fit-content"};
`;

export const TextField = styled(MUITextField)`
  
`;