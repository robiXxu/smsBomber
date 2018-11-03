import React from 'react';
import SmsBomber from './views/SmsBomber';
import { Container, Header, Body, H3 } from 'native-base';
export default class App extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <H3 style={{ color: '#FFF', fontWeight: '400' }}>SmsBomber</H3>  
          </Body>
        </Header>
        <SmsBomber />
      </Container>
    );
  }
}
