/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */
const DEFAULT_SELECTED_BACKGROUND_COLOR = '#5ce600';
const DEFAULT_SELECTED_TEXT_COLOR = '#000000';
const DEFAULT_TODAY_BACKGROUND_COLOR = '#CCCCCC';

function getBorderRadiusByShape(scaler, dayShape) {
  if (dayShape === 'square') {
    return 0;
  } else {
    return 30*scaler;
  }
}

export function makeStyles(scaler, backgroundColor, textColor, todayBackgroundColor, dayShape) {
  const SELECTED_BG_COLOR = backgroundColor ? backgroundColor : DEFAULT_SELECTED_BACKGROUND_COLOR;
  const SELECTED_TEXT_COLOR = textColor ? textColor : DEFAULT_SELECTED_TEXT_COLOR;
  const TODAY_BG_COLOR = todayBackgroundColor ? todayBackgroundColor : DEFAULT_TODAY_BACKGROUND_COLOR;

  return {
    calendar: {
      minHeight: 200*scaler,
      width: 343*scaler,
      marginTop: 20*scaler,
      marginBottom: 10*scaler,
    },

    dayButton: {
      width: 30*scaler,
      height: 30*scaler,
      borderRadius: getBorderRadiusByShape(scaler, dayShape),
      alignSelf: 'center',
      justifyContent: 'center'
    },

    dayLabel: {
      fontSize: 14*scaler,
      color: '#000',
      alignSelf: 'center'
    },

    selectedDayLabel: {
      color: SELECTED_TEXT_COLOR,
    },

    dayLabelsWrapper: {
      flexDirection: 'row',
      paddingTop: 10*scaler,
      paddingBottom: 10*scaler,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderColor: 'rgba(0,0,0,0.2)'
    },

    daysWrapper: {
      alignSelf: 'center',
      justifyContent: 'center',
      color: '#333333',
      fontSize: 14*scaler,
      fontWeight: '500',
    },

    dayLabels: {
      width: 50*scaler,
      fontSize: 12*scaler,
      color: '#000',
      textAlign: 'center'
    },

    selectedDay: {
      width: 30*scaler,
      height:30*scaler,
      borderRadius: getBorderRadiusByShape(scaler, dayShape),
      alignSelf: 'center',
      justifyContent: 'center'
    },

    selectedDayBackground: {
      backgroundColor: SELECTED_BG_COLOR,
    },

    todayStyle: {
      height: 4*scaler,
      width: 4*scaler,
      backgroundColor: '#FF9382',
      borderRadius: 2,
      alignSelf: 'center',
      position: 'absolute',
      top: 35,
    },

    selectedDayTextStyle: {
      color: '#3D8DF5',
      fontSize: 14*scaler,
      fontWeight: '500',
    },

    lastCol : {
      borderTopRightRadius: 6*scaler,
      borderBottomRightRadius: 6*scaler,
    },

    firstCol: {
      borderTopLeftRadius: 6*scaler,
      borderBottomLeftRadius: 6*scaler,
    },

    selectedToday: {
      width: 30*scaler,
      height:30*scaler,
      backgroundColor: TODAY_BG_COLOR,
      borderRadius: getBorderRadiusByShape(scaler, dayShape),
      alignSelf: 'center',
      justifyContent: 'center'
    },

    dayWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 49*scaler,
      height: 40*scaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    startDayWrapper: {
      width: 50*scaler,
      height: 35*scaler,
      borderTopLeftRadius: 20*scaler,
      borderBottomLeftRadius: 20*scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    endDayWrapper: {
      width: 50*scaler,
      height: 35*scaler,
      borderTopRightRadius: 20*scaler,
      borderBottomRightRadius: 20*scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    inRangeDay: {
      width: 49*scaler,
      height: 35*scaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    monthLabel: {
      fontSize: 18*scaler,
      width: 180*scaler,
      textAlign: 'center',
      color: '#333333',
      fontWeight: '500',
      letterSpacing: -0.24,
      lineHeight: 22,
      marginBottom: 10*scaler,
    },

    headerWrapper: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    monthSelector: {
      fontSize: 14*scaler,
    },

    prev: {
      textAlign: 'left'
    },

    next: {
      textAlign: 'right'
    },

    yearLabel: {
      fontSize: 14*scaler,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center'
    },

    weeks: {
      flexDirection: 'column'
    },

    weekRow: {
      flexDirection: 'row'
    },

    disabledText: {
      fontSize: 14*scaler,
      color: '#8C94A1',
      alignSelf: 'center',
      justifyContent: 'center'
    },

    yearLabel: {
      color: '#8C94A1',
      fontSize: 11*scaler,
      letterSpacing: -0.15*scaler,
      lineHeight: 13*scaler,
      fontWeight: '400',
      paddingLeft: 5*scaler,
    },

    seprator : {
      height: 1*scaler,
      backgroundColor: '#E0E4E880',
    },

    disabledTextStyle: {
      color: '#DBDEE3',
    }
  };
}
