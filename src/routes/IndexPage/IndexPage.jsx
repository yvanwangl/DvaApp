import React, {Component} from 'react';
import yay from '../../assets/yay.jpg';
import styles from './index.css';

const IndexPage = ()=> {
    return (
        <div className={styles.indexPage}>
            <img src={yay} alt=""/>
            <div>欢迎来到DVA的世界！</div>
        </div>
    );
};

export default IndexPage;