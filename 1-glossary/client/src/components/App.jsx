import React from 'react'
import Add from './Add.jsx'
import Search from './Search.jsx'
import Glossary from './Glossary.jsx'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      glossary: '', //glossary will be array of word objects meant to be rendered

    }
  }

  componentDidMount() {
    console.log('mounted')
    axios('http://localhost:3000/words/all').then((response) => {
      console.log('client sending get req')
      //response.data will have the all the words in the db
    })
  }

  render() {
    return (
      <div>
        <Glossary />
        <Search />
        <Add />
      </div>
    )
  }
}

export default App