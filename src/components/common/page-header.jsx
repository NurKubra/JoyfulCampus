import React from 'react'
import "./page-header.scss"
// aktif olarak hangi sayfada bulunuyorsa onu anlamak icin "turuncu serit" --> sayfa basligi 



const PageHeader = ({title}) => {
  return (
    <div className='page-header'>
        <h1>{title}</h1>
    </div>
  )
}

export default PageHeader