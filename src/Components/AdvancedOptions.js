/*collapsing panel for advanced options including importing data and exporting data */
import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { CSVLink } from "react-csv";
import Button from "@material-ui/core/Button";
import ImportIcon from "@material-ui/icons/ArrowForward";
import ExportIcon from "@material-ui/icons/ArrowBack";

class AdvancedOptions extends Component {
    state = {
        expanded: false
    }

    //toggle collapse or expand advanced options
    handleShowHideOptions = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        return (
            <div>

                <Button onClick={this.handleShowHideOptions} >
                    {!this.state.expanded? 'Advanced Options' : 'Hide Advanced Options'}
                </Button>
                <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>

                    <div style={{ marginTop: 5 }} />
                    <input
                        id="fileSelect"
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={e => this.props.handleFileChosen(e.target.files[0])}
                        style={{ display: 'none' }} />

                    <label htmlFor="fileSelect">
                        <Button variant='outlined' component="span">
                            <ImportIcon />
                            Import data
                                </Button>
                    </label>

                    <div style={{ marginTop: 15 }} />
                    <Button variant='outlined' component="span">
                        <CSVLink data={this.props.rows} style={{ textDecoration: 'none', color: 'black' }}>
                            <ExportIcon />Export data
                                </CSVLink>
                    </Button>


                </Collapse>

            </div>
        )
    }


}
export default AdvancedOptions