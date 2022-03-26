import React from 'react';
import axios from 'axios'

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addWord: '',
      addDef: ''
    }

    this.handleAddWordChange = this.handleAddWordChange.bind(this);
    this.handleAddDefChange = this.handleAddDefChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newWord = {
      name: this.state.addWord,
      definition: this.state.addDef
    }
    axios({
      method: 'post',
      url: 'http://localhost:3000/words/add',
      data: { newWord: newWord }
    })
    this.setState({addWord: '', addDef: ''})
  }

  handleAddWordChange(event) {
    event.preventDefault();
    this.setState({addWord: event.target.value});
  }

  handleAddDefChange(event) {
    event.preventDefault();
    this.setState({addDef: event.target.value});
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type='text' placeholder={'Add Word'} value={this.state.addWord} onChange={this.handleAddWordChange}/>
        <input type='text' placeholder={'Add Definition'} value={this.state.addDef} onChange={this.handleAddDefChange}/>
        <button type='submit'>Add</button>
      </form>
    )
  }
}

export default Add