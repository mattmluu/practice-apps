import React from 'react';
import axios from 'axios'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTxt: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({searchTxt: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`this was searched -- ${this.state.searchTxt}`)
    this.props.liftSearch(this.state.searchTxt);
    this.setState({searchTxt: ''})
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type='text' placeholder={'Search'} value={this.state.searchTxt} onChange={this.handleChange} />
        <button type='submit'>Search</button>
      </form>
    )
  }
}

export default Search