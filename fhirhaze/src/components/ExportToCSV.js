import {CSVLink} from "react-csv";
import React from 'react';
import Button from 'react-bootstrap/Button';

//This function exports data from array to CSV and downloads it. It uses 'react-csv' library
export function ExportToCSV(props){
    var data = props.array;
    return <CSVLink data={data} filename={props.fileName}>
        <Button variant="info">Export To CSV</Button>
        </CSVLink>
}