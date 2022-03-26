import React from 'react'
import axios from 'axios'

class Word extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.name,
      definition: props.definition,
      nameChangeTo: '',
      definitionChangeTo: '',
      editing: false
    }

    this.handleDelete = this.handleDelete.bind(this)

    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleEditSubmission = this.handleEditSubmission.bind(this)
    this.handleEditWord = this.handleEditWord.bind(this)
    this.handleEditDefinition = this.handleEditDefinition.bind(this)
  }

  handleEditClick(e) {
    e.preventDefault()
    this.setState({
      editing: !this.state.editing,
      nameChangeTo: this.state.name,
      definitionChangeTo: this.state.definition
    })

  }

  handleEditSubmission(e) {
    e.preventDefault()
    axios.post('words/edit', {
      name: this.state.name,
      definition: this.state.definition,
      nameChangeTo: this.state.nameChangeTo,
      definitionChangeTo: this.state.definitionChangeTo
    }).then((response) => {
    }).catch((error) => {
      console.log(error)
    })
    this.setState({
      editing: !this.state.editing
    })
    this.props.loadWords()
  }

  handleEditWord(e) {
    e.preventDefault()
    this.setState({
      nameChangeTo: e.target.value
    })
  }

  handleEditDefinition(e) {
    e.preventDefault()
    this.setState({
      definitionChangeTo: e.target.value
    })
  }

  handleDelete(event) {
    event.preventDefault()
    axios.post('/words/delete', {
      name: event.target.value
    }).then((response) => {
      this.props.loadWords();
    }).catch((error) => {console.log(error)
    })
  }

  render() {
    return (
      <div>
        <li >

          {
          !this.state.editing
          ?
          <div>{this.props.name + ' -- ' + this.props.definition}</div>
          :
          <form onSubmit={this.handleEditSubmission}>
            <input type='text' value={this.state.nameChangeTo} onChange={this.handleEditWord}></input>
            <input type='text' value={this.state.definitionChangeTo} onChange={this.handleEditDefinition}></input>
            <button type='submit'>Submit</button>
          </form>
          }

          <button onClick={this.handleDelete} value={this.state.name}>Delete</button>
          {
          !this.state.editing
          ?
          <button onClick={this.handleEditClick}>Edit</button>
          :
          <button onClick={this.handleEditClick}>Close</button>
          }
        </li>
      </div>
    )
  }
}

export default Word





// render() {
//   if (this.state.editing === true) {
//     return (
//     <div>
//       <li >
//         <input></input>

//         <button onClick={this.handleDelete} value={this.state.name} >Delete</button>
//         <button onClick={this.handleEditClick}>Edit</button>
//       </li>
//     </div>
//     )
//   }
//   return (
//     <div>
//       <li >
//         {
//         this.state.editing ? <form> </form> : <div>{this.props.name + ' -- ' + this.props.definition}</div>
//         }
//         <button onClick={this.handleDelete} value={this.state.name} >Delete</button>
//         <button onClick={this.handleEditClick}>Edit</button>
//       </li>
//     </div>
//   )
// }