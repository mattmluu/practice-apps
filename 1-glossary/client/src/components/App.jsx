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

    this.liftSearch = this.liftSearch.bind(this);
  }

  componentDidMount() {
    console.log('mounted')
    axios('http://localhost:3000/words/all').then((response) => {
      this.setState({glossary: response.data});
      console.log(this.state.glossary)
    })
  }

  liftSearch(searchTxt) {
    axios.get(`http://localhost:3000/words/search?searchTxt=${searchTxt}`)
    .then((response) => {
      this.setState({glossary: response.data})
    })
    .catch(() => {
      console.log('error sending search get request')
    })

    // axios.get({
    //   method: 'get',
    //   url: `http://localhost:3000/words/search}`
    //   params: {searchTxt: searchTxt}
    // }).then((response) => {
    //   console.log(response.data)
    //   //this.setState({ glossary: [response.data] })
    // }).catch(() => {
    //   console.log('failed get search request')
    // })
  }

  render() {
    return (
      <div>
        <Search liftSearch={this.liftSearch} />
        <Add />
        <Glossary glossary={this.state.glossary} />
      </div>
    )
  }
}

export default App