import { Main } from "components";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const App = () => {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
