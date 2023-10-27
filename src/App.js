import React from 'react'
import Pages from "./pages/Pages";
import { BrowserRouter } from 'react-router-dom';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header>
          <Logo to={"/"}>Home</Logo>
          <Logo to={"/me"}>MyPage</Logo>
        </Header>
        <Pages />
      </BrowserRouter>
    </div >
  );
}

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-family: cursive;
  margin: 0 1rem;
`;

const Header = styled.div`
  padding: 4rem 0rem;
`;

export default App;

