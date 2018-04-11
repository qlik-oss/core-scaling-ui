const colors = {
  blue: '#3a7391',
  darkBlue: '#3a7391',
  deepBlue: '#214152',
  white: '#ffffff',
  offWhite: '#c5d5cd',
  green: '#61a729',
  darkGreen: '#44751d',
  deepGreen: '#274310',
  orange: '#f8981d',
  purple: '#ae5798',
};

const palettes = {
  categorical: {
    key: 'categorical',
    colors: [
      [colors.darkGreen, colors.darkBlue],
      [colors.darkGreen, colors.darkBlue, colors.orange],
      [colors.darkGreen, colors.darkBlue, colors.orange, colors.purple],
      [
        colors.darkGreen,
        colors.darkBlue,
        colors.orange,
        colors.purple,
        '#79d69f',
        '#138185',
        '#65d3da',
      ],
      [
        colors.darkGreen,
        colors.darkBlue,
        colors.orange,
        colors.purple,
        '#f9ec86',
        '#cbe989',
        '#70ba6e',
        '#578b60',
        '#79d69f',
        '#26a0a7',
        '#138185',
        '#65d3da',
      ],
    ],
  },
  sequential: [colors.deepBlue, colors.darkBlue, colors.green],
};

const styles = {
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  userSelectNone: {
    userSelect: 'none',
  },
  login: {
    underline: {
      borderBottomColor: colors.darkBlue,
    },
    contentStyle: {
      width: '350px',
    },
  },
  app: {
    cardTitle: {
      padding: '0 0 0 15px',
    },
    cardTitleSize: {
      fontSize: '1rem',
    },
    chartCard: {
      margin: '15px',
      flex: '1 1 auto',
    },
  },
};
export { colors, styles, palettes };
