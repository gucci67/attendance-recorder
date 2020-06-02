import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import "./App.css";
import AttendanceTable from "./components/AttendanceTable";
import MonthButton from "./components/MonthButton";
import AttendanceContextProvider from "./contexts/AttendanceContext";

function App() {
    componentDidMount();
    return (
        <div className="App">
            <Container fluid={true}>
                <h2 className="mt-4">Attendance Recorder</h2>
                <AttendanceContextProvider>
                    <MonthButton />
                    <AttendanceTable />
                </AttendanceContextProvider>
            </Container>
        </div>
    );
}

const componentDidMount = () => {
    document.title = "Attendance Recorder";
};

export default App;
