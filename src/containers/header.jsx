import React from 'react';
import styles from './header.css';
import CustomLink from '../components/link';

export default function Header() {
  return (
    <div className={styles.header}>
      <CustomLink title="Section 1" linkTo="#section1" />
      <CustomLink title="Section 2" linkTo="#section2" />
      <CustomLink title="Section 3" linkTo="#section3" />
    </div>
  );
}
