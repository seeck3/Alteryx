import { Container, makeStyles } from '@material-ui/core';
import { Container as Containerr } from './components/Container'
// import InterviewWelcome from './ALTERYX_ONLY_DO_NOT_MODIFY/InterviewWelcome.alteryx';

const useStyles = makeStyles({
  app: {
    paddingTop: 16,
  },
});

function App() {
  const classes = useStyles();
  return (
    <Container className={classes.app} maxWidth='md'>
      <Containerr />
      {/* To Get started comment or remove <InterviewWelcome /> component and get started */}
      {/* Do NOT modify files in the ALTERYX_ONLY_DO_NOT_MODIFY folder. Files there will not be evaluated */}
      {/* <InterviewWelcome /> */}
    </Container>
  );
}

export default App;
