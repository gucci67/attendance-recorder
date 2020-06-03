import React, { useContext } from "react";
import { Table } from "reactstrap";
import "../App.css";
import { AttendanceContext } from "../contexts/AttendanceContext";

function AttendanceTable() {
    const { attendance } = useContext(AttendanceContext);
    const allUserNames = attendance
        .flatMap((dayAttendance) => dayAttendance.users)
        .map((user) => user.userName)
        .reduce((userNames, userName) => {
            if (userNames.indexOf(userName) === -1) {
                userNames.push(userName);
            }
            return userNames;
        }, [])
        .sort();

    if (allUserNames.length === 0) {
        return <div className="h2 mt-2">No Data</div>;
    }

    // その日の出勤状況を取得
    const todayAttendance = getTodayAttendance(attendance);

    return (
        <Table bordered hover size="sm" className="mt-2 sticky_table">
            <thead>
                <AttendanceHeader
                    allUserNames={allUserNames}
                    todayAttendance={todayAttendance}
                />
            </thead>
            <tbody>
                {attendance &&
                    attendance.map((dayAttendance, index) => {
                        return (
                            <AttendanceRow
                                index={index}
                                allUserNames={allUserNames}
                                dayAttendance={dayAttendance}
                            />
                        );
                    })}
            </tbody>
        </Table>
    );
}

const AttendanceHeader = (props) => {
    return (
        <tr>
            <th bgcolor="#e6e6e6">#</th>
            {props.allUserNames &&
                props.allUserNames.map((userName, index) => {
                    return (
                        <th
                            bgcolor={
                                // 出勤状況によって背景色を変える（出勤中：緑、退勤済み：グレー）
                                isWorking(props.todayAttendance, userName)
                                    ? "#00d18b"
                                    : "#e6e6e6"
                            }
                            key={index}
                        >
                            {userName}
                        </th>
                    );
                })}
        </tr>
    );
};

const AttendanceRow = (props) => {
    const day = props.index + 1;
    return (
        <tr key={props.index}>
            <th>{day}</th>
            {props.allUserNames &&
                props.allUserNames.map((userName, index) => {
                    const user = props.dayAttendance.users.find(
                        (x) => x.userName === userName
                    );
                    if (user) {
                        const come =
                            (user.comeTime || "").substring(0, 5) || "";
                        const leave =
                            (user.leaveTime || "").substring(0, 5) || "";
                        return (
                            <td
                                bgcolor={overtimeLevel(leave)}
                                key={index}
                            >{`${come} ~ ${leave}`}</td>
                        );
                    } else {
                        return <td>~</td>;
                    }
                })}
        </tr>
    );
};

const getTodayAttendance = (attendance) => {
    let today = new Date().getDay();
    if (today < 10) {
        today = "0" + today;
    }
    return attendance.find((x) => x.date.includes(today, 7));
};

const isWorking = (todayAttendance, userName) => {
    const attendance = todayAttendance.users.find(
        (x) => x.userName === userName
    );
    if (attendance) {
        // その日の出勤情報に名前がある、かつ、退勤時間がない場合は出勤中とする
        return attendance.leaveTime == null;
    }
    return false;
};

const overtimeLevel = (leave) => {
    if (leave) {
        const leaveHour = leave.substring(0, 2);
        switch (leaveHour) {
            case "22":
            case "23":
                return "#faa";
            case "21":
                return "#fca";
            case "20":
                return "#ffa";
            default:
                break;
        }
    }
    return "";
};

export default AttendanceTable;
