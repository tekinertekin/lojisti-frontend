import styled from "styled-components";

export const ErrorContainer = styled("div")`
  padding: 0.7rem 0;
  background:#a00909;
  display:hidden;
  border: 1px solid #edf3f5;
  border-radius: 10px;
  text-align: center;
  vertical-align: center;
  margin:5px;


  @media only screen and (max-width: 1024px) {
    padding: 3rem 0;
  }
`;