import React from 'react'

import './styles.css'

interface PageHeaderProps {
  titulo: string
  endereço: string
}

const Cabeçalho: React.FC<PageHeaderProps> = props => (
  <header className="page-header">
    <div className="top-bar-container">
      <p>{props.endereço}</p>
    </div>

    <div className="header-content">
      <strong>{props.titulo}</strong>
    </div>
  </header>
)

export default Cabeçalho
