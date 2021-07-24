import { AppBar, Toolbar, Grid } from "@material-ui/core";

function Header(){
    return(
        <AppBar position="static">
            <Toolbar>
                <Grid container>
                    Postlight App!
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header;