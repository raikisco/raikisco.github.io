import React from "react";
import styled from "react-emotion";

//Import core
import { Section, SectionContent } from "./core";

const Row = styled('div')`
  display: flex;
  @media (max-width:750px){
    flex-direction: column;
  }
`
const HorizBlock = styled('div')`
  flex:1;
  display: inline-block;
  vertical-align: top;
  min-width: 200px;
  margin:15px;
`
const Paragraph = styled('p')`
  white-space: nowrap;
  margin:0px 5px;
  width:100%;
`
export default function ContactSection(props) {
  return (
    <Section green style={{minHeight:'auto'}}>
      <SectionContent style={{whiteSpace:'normal'}}>
        <h2>Contact</h2>
        <br/>
        <Row>
        <HorizBlock>
          <h3>Email</h3>
          <Paragraph>Raikisco@gmail.com</Paragraph>
        </HorizBlock>
        <HorizBlock>
          <h3>Address</h3>
          <Paragraph>41708 Government Road<br/> P.O. Box 3378 <br/> Garibaldi Highlands, BC <br/> V0N 1T0</Paragraph>
        </HorizBlock>
        <HorizBlock>
          <h3>Telephone</h3>
          <Paragraph>778 226 1184</Paragraph>
        </HorizBlock>
        </Row>
      </SectionContent>
    </Section>
  );
}
