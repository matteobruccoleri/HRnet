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
  background-color: #F6F8FA;
  width: 100%;
  padding: 5%;
`

export default App;
