import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AttendanceContext = createContext();

const AttendanceContextProvider = (props) => {
    const url = "http://localhost:8080";
    const [month, setMonth] = useState(new Date());
    const [attendance, setAttendance] = useState([]);
    const getAttendance = () => {
        const monthString = toMonthString(month);
        axios
            .get(url + "/api/attendances", { params: { month: monthString } })
            .then((result) => {
                setAttendance(result.data);
            })
            .catch(() => {
                console.log("通信に失敗しました。");
            });
    };
    useEffect(() => {
        getAttendance();
    }, [month]);

    const changeNextMonth = () => {
        const nextMonth = month.setMonth(month.getMonth() + 1);
        setMonth(new Date(nextMonth));
    };

    const changePrevMonth = () => {
        const prevMonth = month.setMonth(month.getMonth() - 1);
        setMonth(new Date(prevMonth));
    };

    const toMonthString = () => {
        let monthString = month.getFullYear() + "-";
        const monthNumber = month.getMonth() + 1;

        if (monthNumber < 10) {
            monthString += "0";
        }

        monthString += monthNumber;
        return monthString;
    };

    return (
        <AttendanceContext.Provider
            value={{
                month,
                attendance,
                changeNextMonth,
                changePrevMonth,
                toMonthString,
            }}
        >
            {props.children}
        </AttendanceContext.Provider>
    );
};

export default AttendanceContextProvider;
