import React from "react";
import styled from "react-emotion";

//Import Core
import {Button} from 'core';
//Import assets
import leaves from "assets/leaves.jpg";

const SectionBG = styled("header")`
  height: 75vh;
  position: relative;
  width: 100vw;
  background-image: url(${leaves});
`;

const Content = styled("div")`
  position: relative;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  max-width: 800px;
  padding: 30px;
  text-shadow: 2px 2px 10px #000;
  text-align: center;
`;

const ButtonRow = styled("div")`
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;


export default function Hero(props) {
  return (
    <SectionBG>
      <Content>
        <h1>Anata Massage</h1>
        <h3>
          On demand relaxation and healing. <br /> Delivered right to your home.
        </h3>
        <ButtonRow>
          <Button> Book Now </Button>
          <Button> View Services </Button>
        </ButtonRow>
        <h4>
          Mobile massage treatments <br /> in Squamish and Whistler, BC.
        </h4>
      </Content>
    </SectionBG>
  );
}
