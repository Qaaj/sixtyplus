import React from "react";
import moment from "moment";
import {Input} from 'react-bootstrap';
import DayPicker, { DateUtils } from "react-day-picker";

export default class InputField extends React.Component {

  state = {
    value: moment().format("L"), // The value of the input field
    month: new Date(), // The month to display in the calendar
    showCalendar:false
  }

  handleInputChange(e) {

    const { value } = e.target;
    let { month } = this.state;

    // Change the current month only if the value entered by the user is a valid
    // date, according to the `L` format
    if (moment(value, "L", true).isValid()) {
      month = moment(value, "L").toDate();
    }
    this.ignoreHidingOnce = false;
    this.props.onChange(e.target.value);
    this.setState({ value, month }, this.showCurrentDate);

  }

  handleDayClick(e, day, modifiers) {

    if (modifiers.indexOf("disabled") > -1) {
      return;
    }

    this.setState({
      value: moment(day).format("L"),
      month: day,
      showCalendar:false
    });

    this.props.onChange(moment(day).format("L"));

  }

  showCurrentDate() {
    this.setState({
      showCalendar: true
    })
  }

  hidePicker(e,i){
    if(this.ignoreHidingOnce){
      this.ignoreHidingOnce = false;
      return;
    }
    this.setState({
      showCalendar: false
    })
  }

  onMonthChange(e){
    this.ignoreHidingOnce = true;
  }

  render() {
    const selectedDay = moment(this.state.value, "L", true).toDate();
    let hideCal = 'hideCal';
    if(this.state.showCalendar) hideCal = '';

    return (
      <div className="calendarPicker" onFocus={ this.showCurrentDate.bind(this)}>
          <Input
            ref="input"
            type="text"
            value={ this.state.value }
            placeholder="YYYY-MM-DD"
            onChange={ this.handleInputChange.bind(this) }
             />
        <div onBlur={ this.hidePicker.bind(this)}>
          <DayPicker
            onMonthChange={this.onMonthChange.bind(this)}
            className={hideCal}
            ref="daypicker"
            enableOutsideDays
            initialMonth={ this.state.month }
            modifiers={{
            selected: day => DateUtils.isSameDay(selectedDay, day)
          }}
            onDayClick={ this.handleDayClick.bind(this) }
          />
        </div>


      </div>
    );
  }

}
