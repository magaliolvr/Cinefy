import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
    }
`;
