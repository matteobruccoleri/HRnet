import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header  from "./components/organisms/Header";

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
  background-color: #f9f9f9;
`

export default App
