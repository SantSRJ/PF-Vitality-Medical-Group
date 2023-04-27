import React from 'react';
import axios from 'axios';
import { useState , useEffect , useLayoutEffect , useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import News from './News';
import styles from './News.module.css';

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/8851547/pexels-photo-8851547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
const INITIAL_PAGE = 0;
const ITEMS = 1;

export default function ContainerNews() {

    const [news, setNews] = useState([]);

    const getNews = async () => {
        const results = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=health&pageSize=100&apiKey=7ffa9b40912247c3b28531550fd10087')
            .then((res) => res.data.articles)
            .catch((err) => window.alert('Error: Get News'));

        results && setNews(results);
    };
    
    useLayoutEffect(() => {

        getNews();

    }, []);

    const INITIAL_ITEMS = [...news].splice(INITIAL_PAGE, ITEMS);
    const [itemsPage, setItemsPage] = useState(INITIAL_ITEMS);
    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

    const nextHandler = () => {
        const totalElements = news.length;
        const nextPage = currentPage + 1;
        const indexNextPage = nextPage * ITEMS;
        
        if(indexNextPage >= totalElements) {
            setItemsPage(INITIAL_ITEMS);
            setCurrentPage(INITIAL_PAGE);
            return;
        };
        //console.log(nextPage);
        //console.log(indexNextPage);
        //console.log(totalElements);

        setItemsPage([...news].splice(indexNextPage, ITEMS));
        setCurrentPage(nextPage);
        
    };
    const prevHandler = () => {
        const prevPage = currentPage -1;
        const indexPrevPage = prevPage * ITEMS;
        
        setItemsPage([...news].splice(indexPrevPage, ITEMS));
        setCurrentPage(prevPage);
        
    };


    let infiniteLoop = setTimeout(() => {
        nextHandler();
    }, 3000 );

    useEffect(() => {

        setItemsPage(INITIAL_ITEMS);
        setCurrentPage(INITIAL_PAGE);
        
    }, [ news ]);

    return (

        <div className={styles.container}>

            <h2>Novedades internacionales</h2>

            {/* <button onClick={() => prevHandler()}>{'<'}</button> */}

            {itemsPage && itemsPage.map((item, index) => (
                <News
                key = {index}
                title = {item.title}
                description = {item.description}
                image = {item.urlToImage ? item.urlToImage : DEFAULT_IMAGE}
                url = {item.url}
            />
            ))}

            {/* <button onClick={() => nextHandler()}>{'>'}</button> */}

        </div>


    )
};
