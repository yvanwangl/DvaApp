import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import styles from './index.css';

const HomePage = ({children})=>(
    <div className={styles.homePage}>
        <Header/>
        {children}
    </div>
);

export default HomePage;