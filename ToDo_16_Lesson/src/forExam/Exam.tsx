// При запуске проекта на экране вы увидите 2 списка: Products и Films.
//
//     С ними все хорошо, но обратите внимание на типизацию ответов с сервера ProductsResponseType и FilmsResponseType.
//
//     Дублирование типов на лицо.
//
//     Ваша задача написать дженериковый тип CommonResponseType и заменить им дублирующие типы.
//
//     Очередность свойств в типах менять запрещено (по причине что нам будет тяжело перебрать все правильные варианты :) )
//
// Параметр тип назовите буквой T
//
// В качестве ответа нужно скопировать полностью рабочий дженериковый тип CommonResponseType
//
// 🖥 Пример ответа:
//
//     type CommonResponseType = {
//
//         total: T
//
//         messages: T[]
//
//         page: T
//
//         pageCount: T
//
//         data: T[]
//
//     }
//
// copy
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';

// TYPES
type ProductType = {
    id: string
    title: string
    description: string
    price: number
}

type FilmType = {
    id: number
    nameOriginal: string
    description: string
    ratingImdb: number
}

type ProductsResponseType = {
    total: number
    messages: string[]
    page: number
    pageCount: number
    data: ProductType[]
}

type FilmsResponseType = {
    total: number
    messages: string[]
    page: number
    pageCount: number
    data: FilmType[]
}

type CommonResponseType<T> = {
    total: number
    messages: string[]
    page: number
    pageCount: number
    data:T[]
}

// Api
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const api = {
    getProducts() {
        return instance.get<CommonResponseType<ProductType>>('products')
    },
    getFilms() {
        return instance.get<CommonResponseType<FilmType>>('films')
    }
}


// App
export const App2 = () => {
    return (
        <>
            <h1>🛒 Products && 🎦 Films</h1>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <Products/>
                <Films/>
            </div>
        </>
    )
}

const Products = () => {

    const [products, setProducts] = useState<ProductType[]>([])

    useEffect(() => {
        api.getProducts()
            .then((res) => setProducts(res.data.data))
    }, [])

    return (
        <div style={{width: '45%'}}>
            <h2>🛒 Products</h2>
            <div>
                {
                    products.map(p => {
                        return (
                            <div key={p.id}>
                                <b>{p.title}</b>
                                <p>{p.description}</p>
                                <p>💵 {p.price} $</p>
                            </div>
                        )
                    })
                }</div>
        </div>
    )
}

const Films = () => {

    const [films, setFilms] = useState<FilmType[]>([])

    useEffect(() => {
        api.getFilms()
            .then((res) => setFilms(res.data.data))
    }, [])

    return (
        <div style={{width: '45%'}}>
            <h2>🎦 Films</h2>
            <div>
                {
                    films.map(f => {
                        return (
                            <div key={f.id}>
                                <b>{f.nameOriginal}</b>
                                <p>{f.description}</p>
                                <p>⭐ {f.ratingImdb} </p>
                            </div>
                        )
                    })
                }</div>
        </div>
    )
}


// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App/>)

// 📜 Описание:
// При запуске проекта на экране вы увидите 2 списка: Products и Films.
// С ними все хорошо, но обратите внимание на типизацию ответов с сервера ProductsResponseType и FilmsResponseType.
// Дублирование типов на лицо.
// Ваша задача написать дженериковый тип CommonResponseType и заменить им дублирующие типы.
// Очередность свойств в типах менять запрещено (по причине что нам будет тяжело перебрать все правильные варианты :) )
// Параметр тип назовите буквой T
//
// В качестве ответа нужно скопировать полностью рабочий дженериковый тип CommonResponseType
//
// 🖥 Пример ответа:
// type CommonResponseType = {
//   total: T
//   messages: T[]
//   page: T
//   pageCount: T
//   data: T[]
// }
