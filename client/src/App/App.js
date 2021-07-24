import { CssBaseline, makeStyles } from "@material-ui/core";
import Header from "../Components/Header"
import Employees from '../Pages/Employees/Employees';

const styles = makeStyles({
  mainCss: {  
    width: '100%'
  }
})

function App() {
  const classes = styles();
  return (
    <>
      <div className={classes.mainCss}>
        <Header></Header>
        <Employees></Employees>
      </div>
      <CssBaseline></CssBaseline>
    </>
  );
}

export default App;