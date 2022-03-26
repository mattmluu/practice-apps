import React from 'react'
import Add from './Add.jsx'
import Search from './Search.jsx'
import Glossary from './Glossary.jsx'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      glossary: [],
    }

    this.liftSearch = this.liftSearch.bind(this)
    this.loadWords = this.loadWords.bind(this)
  }

  loadWords() {
    axios('http://localhost:3000/words/all').then((response) => {
      this.setState({glossary: response.data});
    })
  }

  componentDidMount() {
    this.loadWords()
  }

  liftSearch(searchTxt) {
    axios.get(`http://localhost:3000/words/search?searchTxt=${searchTxt}`)
    .then((response) => {
      this.setState({glossary: response.data})
    })
    .catch(() => {
      console.log('error sending search get request')
    })
  }

  render() {
    return (
      <div>
        <Search liftSearch={this.liftSearch} />
        <Add loadWords={this.loadWords}/>
        <Glossary glossary={this.state.glossary} loadWords={this.loadWords}/>
      </div>
    )
  }
}

export default App