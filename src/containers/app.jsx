import React, { Component } from 'react';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import enigma from 'enigma.js';
import enigmaConfig from '../enigma-config';
import styles from './app.css';
import Header from './header';
import CustomLink from '../components/link';
import FirstSection from './firstSection';
import Drawer from '../components/drawer';

export default class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = { app: null, error: null };
    this.getApp();
  }

  componentWillMount() {
    configureAnchors({ offset: -35, scrollDuration: 800 });
  }

  async getApp() {
    const session = enigma.create(enigmaConfig);

    try {
      const global = await session.open();
      const app = await global.openDoc('Shared-Africa-Urbanization.qvf');
      this.setState({ app });
    } catch (error) {
      // console.log(error);
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <p>Oops, something went wrong.{this.state.error} </p>;
    }
    if (!this.state.app) {
      return null;
    }

    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.content}>
          <ScrollableAnchor id="section1">
            <div className={styles.firstSection}>
              <FirstSection app={this.state.app} />
              <Drawer title="Life Expectancy" linkTo="#section2" />
            </div>
          </ScrollableAnchor>
          <ScrollableAnchor id="section2">
            <div className={styles.secondSection}>
              <div className={styles.next}>
                <CustomLink title="Next" linkTo="#section3" />
              </div>
            </div>
          </ScrollableAnchor>
          <ScrollableAnchor id="section3">
            <div className={styles.thirdSection}> How are you doing? </div>
          </ScrollableAnchor>
        </div>
      </div>
    );
  }
}
