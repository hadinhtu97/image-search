import styles from '../styles/Home.module.css'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import fetch from 'node-fetch'

const Home = () => {

    const [images, setImages] = useState(null)
    const [recents, setRecents] = useState(null)

    const [query, setQuery] = useState('')
    const [num, setNum] = useState(10)
    const [page, setPage] = useState(1)
    const [size, setSize] = useState('medium')
    const [color, setColor] = useState('color')
    const [type, setType] = useState('jpg')

    useEffect(() => {
        if (query == '') {
            setImages(null)
        }
        setRecents(null)
    }, [query])

    const getImagesThenSetImages = async (e) => {
        e.preventDefault()
        let url = '/api/image?query=' + query + '&num=' + num + '&page=' + page + '&size=' + size + '&color=' + color + '&type=' + type
        let res = await fetch(url)
        let data = await res.json()
        data.hasOwnProperty('error') == true ? setImages(null) : setImages(data)
    }

    const getRecentsThenSetRecents = async (e) => {
        e.preventDefault()
        setQuery('')
        let url = '/api/recent'
        let res = await fetch(url)
        let data = await res.json()
        setRecents(data)
    }

    return (
        <>
            <Head>
                <title>Image Search</title>
            </Head>
            <main className={styles.main}>

                <div className={styles.form} style={query == '' ? { height: '20rem' } : {}}>
                    <form>
                        <input className={styles.submit} type='submit' value='recent' onClick={getRecentsThenSetRecents} />
                        <input className={styles.query} type='search' placeholder='funny cat' value={query} onChange={e => setQuery(e.target.value)} />
                        <select className={styles.select} value={num} onChange={e => setNum(e.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                        <select className={styles.select} value={page} onChange={e => setPage(e.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                        </select>
                        <select className={styles.select} value={size} onChange={e => setSize(e.target.value)}>
                            <option value='icon'>icon</option>
                            <option value='small'>small</option>
                            <option value='medium'>medium</option>
                            <option value='large'>large</option>
                            <option value='xlarge'>xlarge</option>
                            <option value='xxlarge'>xxlarge</option>
                            <option value='huge'>huge</option>
                        </select>
                        <select className={styles.select} value={color} onChange={e => setColor(e.target.value)}>
                            <option value='color'>color</option>
                            <option value='gray'>gray</option>
                            <option value='mono'>mono</option>
                            <option value='trans'>trans</option>
                        </select>
                        <select className={styles.select} value={type} onChange={e => setType(e.target.value)}>
                            <option value='jpg'>jpg</option>
                            <option value='png'>png</option>
                        </select>
                        <input className={styles.submit} type='submit' value='search' onClick={getImagesThenSetImages} />
                        <div className={styles.alert}>
                            as the developer of this website, I will not be responsible if frontend being broken when you choose huge size
                        </div>
                    </form>
                </div>
                <div className={styles.images}>
                    {
                        images == null ? <></> : images.map((image, i) =>
                            <a key={i} href={image.pageURL} target='_blank' title={image.description}>
                                <img className={styles.image} src={image.url} width={image.width} height={image.height} />
                            </a>
                        )
                    }
                </div>
                <div className={styles.recents}>
                    {
                        recents == null ? <></> : recents.map((recent, i) =>
                            <div className={styles.recent} key={i}>
                                <div className={styles.queryString}>{recent.query}</div>
                                <div className={styles.moreInfo}>
                                    <div className={styles.created_at}>{recent.created_at} &nbsp; </div>
                                    <div className={styles.ip}>{recent.ip} &nbsp; </div>
                                    <div style={recent.success == true ? { color: '#392b4c' } : { color: '#2b4c46' }}>{recent.success == true ? 'Success' : 'False'}</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </main>
        </>
    )
}

export default Home