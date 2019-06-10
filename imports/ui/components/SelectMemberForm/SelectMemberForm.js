import React, {Component} from "react";
import Select from "react-select";

const options = [
  {value: "chocolate", label: "Chocolate"},
  {value: "strawberry", label: "Strawberry"},
  {value: "vanilla", label: "Vanilla"}
];

const SelectMemberForm = () => <Select isMulti options={options} />;
console.log(SelectMemberForm);

export default SelectMemberForm;
