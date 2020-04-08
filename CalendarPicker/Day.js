import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function Day(props) {
  const {
    day,
    month,
    year,
    styles,
    lastCol,
    firstCol,
    outOfMonth,
    customDatesStyles,
    onPressDay,
    selectedStartDate,
    selectedEndDate,
    allowRangeSelection,
    selectedDayStyle,
    selectedRangeStartStyle,
    selectedRangeStyle,
    selectedRangeEndStyle,
    textStyle,
    todayTextStyle,
    minDate,
    maxDate,
    disabledDates,
    disabledDatesTextStyle,
    minRangeDuration,
    maxRangeDuration,
    enableDateChange
  } = props;

  const thisDay = moment({year, month, day, hour: 12 });
  const today = moment();

  let dateOutOfRange;
  let todayStyle;
  let daySelectedTextStyle;
  let lastWeekRowCol;
  let firstWeekRowCol;
  let daySelectedStyle = styles.dayButton; // may be overridden depending on state
  let selectedDayColorStyle = {};
  let propSelectedDayStyle;
  let dateIsBeforeMin = false;
  let dateIsAfterMax = false;
  let dateIsDisabled = false;
  let dateIsBeforeMinDuration = false;
  let dateIsAfterMaxDuration = false;
  let customContainerStyle, customDateStyle, customTextStyle;

  // First let's check if date is out of range
  // Check whether props maxDate / minDate are defined. If not supplied,
  // don't restrict dates.
  if (maxDate) {
    dateIsAfterMax = thisDay.isAfter(maxDate, 'day');
  }
  if (minDate) {
    dateIsBeforeMin = thisDay.isBefore(minDate, 'day');
  }

  if (disabledDates) {
    if (Array.isArray(disabledDates) && disabledDates.indexOf(thisDay.valueOf()) >= 0) {
      dateIsDisabled = true;
    }
    else if (disabledDates instanceof Function) {
      dateIsDisabled = disabledDates(thisDay);
    }
  }

  if (allowRangeSelection && minRangeDuration && selectedStartDate && thisDay.isAfter(moment(selectedStartDate), 'day') ) {
    if (Array.isArray(minRangeDuration)) {
      let i = minRangeDuration.findIndex(i => moment(i.date).isSame(moment(selectedStartDate), 'day') );
      if (i >= 0 && moment(selectedStartDate).add(minRangeDuration[i].minDuration, 'day').isAfter(thisDay, 'day') ) {
        dateIsBeforeMinDuration = true;
      }
    } else if(moment(selectedStartDate).add(minRangeDuration, 'day').isAfter(thisDay, 'day')) {
      dateIsBeforeMinDuration = true;
    }
  }

	if (allowRangeSelection && maxRangeDuration && selectedStartDate && thisDay.isAfter(moment(selectedStartDate), 'day') ) {
		if (Array.isArray(maxRangeDuration)) {
			let i = maxRangeDuration.findIndex(i => moment(i.date).isSame(moment(selectedStartDate), 'day') );
			if (i >= 0 && moment(selectedStartDate).add(maxRangeDuration[i].maxDuration, 'day').isBefore(thisDay, 'day') ) {
				dateIsAfterMaxDuration = true;
			}
    } else if(moment(selectedStartDate).add(maxRangeDuration, 'day').isBefore(thisDay, 'day')) {
			dateIsAfterMaxDuration = true;
		}
	}

  dateOutOfRange = dateIsAfterMax || dateIsBeforeMin || dateIsDisabled || dateIsBeforeMinDuration || dateIsAfterMaxDuration || outOfMonth;
  // If date is in range let's apply styles
  if (!dateOutOfRange) {
    // set today's style
    let isToday = thisDay.isSame(today, 'day');
    if (isToday) {
      todayStyle = styles.todayStyle;
      // todayTextStyle prop overrides selectedDayTextColor (created via makeStyles)
      selectedDayColorStyle = todayTextStyle || styles.selectedDayLabel;
    }

    for (let cds of customDatesStyles) {
      if (thisDay.isSame(moment(cds.date), 'day')) {
        customContainerStyle = cds.containerStyle;
        customDateStyle = cds.style;
        customTextStyle = cds.textStyle;
        if (isToday && customDateStyle) {
          // Custom date style overrides 'today' style. It may be reset below
          // by date selection styling.
          daySelectedStyle = [daySelectedStyle, customDateStyle];
        }
        break;
      }
    }

    let isThisDaySameAsSelectedStart = thisDay.isSame(selectedStartDate, 'day');
    let isThisDaySameAsSelectedEnd = thisDay.isSame(selectedEndDate, 'day');

    // set selected day style
    if (!allowRangeSelection &&
        selectedStartDate &&
        isThisDaySameAsSelectedStart) {
      daySelectedStyle = styles.selectedDay;
      selectedDayColorStyle = [styles.selectedDayLabel, isToday && todayTextStyle];
      // selectedDayStyle prop overrides selectedDayColor (created via makeStyles)
      propSelectedDayStyle = selectedDayStyle || styles.selectedDayBackground;
    }

    // Set selected ranges styles
    if (allowRangeSelection) {
      if (selectedStartDate && selectedEndDate) {
          // Apply style for start date
        if (isThisDaySameAsSelectedStart) {
          daySelectedTextStyle = styles.selectedDayTextStyle;
          daySelectedStyle = [styles.startDayWrapper, selectedRangeStyle, selectedRangeStartStyle];
          selectedDayColorStyle = styles.selectedDayLabel;
          lastWeekRowCol = lastCol ? styles.lastCol: undefined;
          firstWeekRowCol = firstCol ? styles.firstCol : undefined;
        }
        // Apply style for end date
        if (isThisDaySameAsSelectedEnd) {
          daySelectedStyle = [styles.endDayWrapper, selectedRangeStyle, selectedRangeEndStyle];
          selectedDayColorStyle = styles.selectedDayLabel;
          lastWeekRowCol = lastCol ? styles.lastCol: undefined;
          firstWeekRowCol = firstCol ? styles.firstCol : undefined;
          daySelectedTextStyle = styles.selectedDayTextStyle;
        }
        // Apply style if start date is the same as end date
        if (isThisDaySameAsSelectedEnd &&
            isThisDaySameAsSelectedStart &&
            selectedEndDate.isSame(selectedStartDate, 'day')) {
            daySelectedStyle = [styles.selectedDay, styles.selectedDayBackground, selectedRangeStyle];
            selectedDayColorStyle = styles.selectedDayLabel;
          firstWeekRowCol = firstCol ? styles.firstCol : undefined;
          lastWeekRowCol = lastCol ? styles.lastCol: undefined;
          daySelectedTextStyle = styles.selectedDayTextStyle;
        }
        // Apply style if this day is in range
        if (thisDay.isBetween(selectedStartDate, selectedEndDate, 'day')) {
          daySelectedStyle = [styles.inRangeDay, selectedRangeStyle];
          firstWeekRowCol = firstCol ? styles.firstCol : undefined;
          lastWeekRowCol = lastCol ? styles.lastCol: undefined;
          selectedDayColorStyle = styles.selectedDayLabel;
        }
      }
      // Apply style if start date has been selected but end date has not
      if (selectedStartDate &&
          !selectedEndDate &&
          isThisDaySameAsSelectedStart) {
          daySelectedStyle = [styles.startDayWrapper, selectedRangeStyle, selectedRangeStartStyle];
          firstWeekRowCol = firstCol ? styles.firstCol : undefined;
          lastWeekRowCol = lastCol ? styles.lastCol: undefined;
          selectedDayColorStyle = styles.selectedDayLabel;
          daySelectedTextStyle = styles.selectedDayTextStyle;
      }
    }
    return (
      <View style={[styles.dayWrapper, customContainerStyle]}>
        <TouchableOpacity
          disabled={!enableDateChange}
          style={[customDateStyle, daySelectedStyle, propSelectedDayStyle, lastWeekRowCol, firstWeekRowCol ]}
          onPress={() => onPressDay(day) }>
          <Text style={[styles.dayLabel, textStyle, customTextStyle, selectedDayColorStyle, daySelectedTextStyle]}>
            { day }
          </Text>
        </TouchableOpacity>
        <View style={todayStyle}></View>
      </View>
    );
  }
  else {  // dateOutOfRange = true
    return (
      <View style={styles.dayWrapper}>
        <Text style={[styles.dayLabel, styles.disabledTextStyle, textStyle, customTextStyle, selectedDayColorStyle, daySelectedTextStyle]}>
          { day }
        </Text>
      </View>
    )
  }
}

Day.defaultProps = {
  customDatesStyles: [],
}

Day.propTypes = {
  styles: PropTypes.shape({}),
  day: PropTypes.number,
  onPressDay: PropTypes.func,
  disabledDates: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  minRangeDuration: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  maxRangeDuration: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
}
