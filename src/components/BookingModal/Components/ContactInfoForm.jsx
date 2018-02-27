import React from "react";
import styled from "react-emotion";

const Input = styled("input")`
  line-height: 34px;
  padding: 0px 10px;
  width: calc(100% - 22px);
  border-radius: 4px;
  border-color: #d9d9d9 #ccc #b3b3b3;
  border: 1px solid #ccc;
  color: #333;
  outline: none;
  font-size: 16px;
  font-weight: 300;
`;
const FlexCont = styled("div")`
  display: flex;
  @media (max-width: 750px) {
    display: block;
  }
`;

const FlexBlock = styled("div")`
  flex: 3;
  text-align: left;
`;

export default function ContactInfoForm(props) {
  return (
    <FlexCont>
      <div style={{ flex: 3, textAlign: "left" }}>
        Name
        <br />
        <Input
          value={props.values.name || ""}
          onChange={e => props.onChange("name", e.target.value)}
        />
        <br />
        <br />
        Address
        <br />
        <Input
          value={props.values.address || ""}
          onChange={e => props.onChange("address", e.target.value)}
        />
      </div>
      <div style={{ flex: 1 }}>
        <br />
      </div>
      <div style={{ flex: 3, textAlign: "left" }}>
        Email
        <br />
        <Input
          value={props.values.email || ""}
          onChange={e => props.onChange("email", e.target.value)}
        />
        <br />
        <br />
        Phone Number
        <br />
        <Input
          value={props.values.phone || ""}
          onChange={e => props.onChange("phone", e.target.value)}
        />
      </div>
    </FlexCont>
  );
}
