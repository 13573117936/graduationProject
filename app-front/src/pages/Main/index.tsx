import React from 'react'
import Header from '../../components/Header'
import style from './style.module.css'
import Search from '../../components/Search'

export default function Main(){
    return (
        <div className={style.back}>
            <Header user={null}></Header>
            <Search></Search>
        </div>
    )
}