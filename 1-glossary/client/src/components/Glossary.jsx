import React from 'react'
import Word from './Word.jsx'

var Glossary = ({glossary, liftEdit, loadWords}) => (
  <ul>
    <div>GLOSSARY</div>
    {glossary.map((word) =>
    <Word name={word.name} definition={word.definition} key={word._id} loadWords={loadWords}/>
    )}
  </ul>
)

export default Glossary