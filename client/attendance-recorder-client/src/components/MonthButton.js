import React, { useContext } from "react";
import { Button } from "reactstrap";
import { AttendanceContext } from "../contexts/AttendanceContext";

function MonthButton() {
    const {
        month,
        changePrevMonth,
        changeNextMonth,
        toMonthString,
    } = useContext(AttendanceContext);
    return (
        <div>
            <Button className="mx-2" onClick={changePrevMonth}>
                PREV
            </Button>
            <span className="h3">{toMonthString(month)}</span>
            <Button className="mx-2" onClick={changeNextMonth}>
                NEXT
            </Button>
        </div>
    );
}

export default MonthButton;
