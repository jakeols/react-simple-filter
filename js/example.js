var UserRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.user.name}</td>
      </tr>
    );
  }
});

var UserTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.user.forEach(function(user) {
      if (user.name.indexOf(this.props.filterText) === -1 || (!user.topDoctor && this.props.topDoctorOnly)) {
        return;
      }
      rows.push(<UserRow user={user} key={user.name} />);
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.topDoctorOnlyInput.checked
    );
  },
  render: function() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.topDoctorOnly}
            ref="topDoctorOnlyInput"
            onChange={this.handleChange}
          />
          {' '}
          Only show top doctors
        </p>
      </form>
    );
  }
});

var FilterableUserTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      topDoctorOnly: false
    };
  },

  handleUserInput: function(filterText, topDoctorOnly) {
    this.setState({
      filterText: filterText,
      topDoctorOnly: topDoctorOnly
    });
  },

  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          topDoctorOnly={this.state.topDoctorOnly}
          onUserInput={this.handleUserInput}
        />
        <UserTable
          user={this.props.user}
          filterText={this.state.filterText}
          topDoctorOnly={this.state.topDoctorOnly}
        />
      </div>
    );
  }
});


var USERS = [
  {topDoctor: true, name: 'John Smith'},
  {topDoctor: true, name: 'Josh Smith'},
  {topDoctor: false, name: 'Jake Smith'},
  {topDoctor: true, name: 'Smith Smith'},
  {topDoctor: false, name: 'Joe Smith'},
  {topDoctor: true, name: 'Nick Smith'}
];

ReactDOM.render(
  <FilterableUserTable user={USERS} />,
  document.getElementById('app')
);
