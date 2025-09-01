import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header  from "./components/Header";

function App() {

  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>

  )
}

const Main = styled.main `
  background-color: #EFEFEF;
`

export default App
