import React from 'react';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



function Header(){

    return (
      <div>
        
        <AppBar position="fixed" >
          <Toolbar>
            <Typography variant="h4" color="inherit" style={{ flex: 1 }}>
              Time Needle
          </Typography>
          </Toolbar>
        </AppBar>


      </div>
    )
}

export default Header