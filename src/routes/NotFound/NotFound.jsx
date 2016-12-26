import React, {Component} from 'react';
import styles from './index.css';

const NotFound = ()=> {
    return (
        <div className={styles.notFound}>
            你访问的浏览器被外星人劫持了 :)
        </div>
    );
};

export default NotFound;