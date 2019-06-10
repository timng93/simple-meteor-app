import React, {Component} from "react";
import Select from "react-select";

class SelectMemberForm extends Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({selectedOption});
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const {selectedOption} = this.state;
    const {users} = this.props;
    const allUsers = users.map(user => ({
      label: user.username,
      value: user._id,
      // email: user.emails[0].address
    }));
    console.log(users);
    return (
      <Select
        isMulti
        value={selectedOption}
        onChange={this.handleChange}
        options={allUsers}
      />
    );
  }
}

export default SelectMemberForm;
