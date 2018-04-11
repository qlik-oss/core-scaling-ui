import React from 'react';
import styles from './header.css';
import CustomLink from '../components/link';

export default function Header() {
  return (
    <div className={styles.header} >
      <CustomLink title="Go to section 1" linkTo="#section1" />
      <CustomLink title="Go to section 2" linkTo="#section2" />
      <CustomLink title="Go to section 3" linkTo="#section3" />
    </div>
  );
}
