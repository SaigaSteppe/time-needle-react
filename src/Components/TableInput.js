/*table for user to input data */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';


function TableInput(props) {

  return (
    <div>
      <Card>
        <Table
          className="table table-bordered table-hover"
          id="tab_logic"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{width:'50%'}}> Date <br/>(Year-MM-DD or Year only)</TableCell>
              <TableCell style={{width:'50%'}}> Event </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
        </Table>

        <div style={{ overflow: 'auto', maxHeight: '300px' }}>
          <Table>
            <TableBody>
              {props.rows.map((item, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>
                    <input
                      type="text"
                      name="date"
                      value={props.rows[idx].date}
                      onChange={props.handleChange(idx)}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      name="event"
                      value={props.rows[idx].event}
                      onChange={props.handleChange(idx)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined" color="secondary"
                      onClick={props.handleRemoveSpecificRow(idx)}
                    >
                      Remove
                            </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

    </div>

  );
}

export default TableInput;
