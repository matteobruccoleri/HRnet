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
  width: 100%;
  padding: 5%;
  height: 100%;
`

export default App;
