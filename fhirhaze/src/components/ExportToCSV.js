import {CSVLink} from "react-csv";
import React from 'react';
import Button from 'react-bootstrap/Button';

export function ExportToCSV(props){
    var data = props.array;
    return <CSVLink data={data} filename={props.fileName}>
        <Button variant="info">Export To CSV</Button>
        </CSVLink>
}