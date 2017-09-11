import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class DropDownMenuSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
        <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          autoWidth={false}
        >
          <MenuItem value={1} primaryText="Custom width" />
        </DropDownMenu>
    );
  }
}
