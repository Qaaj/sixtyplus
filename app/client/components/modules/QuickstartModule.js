import { Grid, Col, Well } from 'react-bootstrap';
import HelpIcon from '../ui/HelpIcon';


class QuickstartModule extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="quickstart_page">
        <Grid>
          <h1>Welcome to Sixtyplus!</h1>
          Sixtyplus is a place where you can plan your financial future and keep track of your investments and expenses
          to help you achieve your goals.
          <hr />
          <Col md={6} className="screenie">

            <div className="title"> Set your goals</div>
            <img className="inline-block image" src="/planner.png"/>
            <div className="inline-block explanation">
                Head over the the <a href="/#/Planner">Planner</a> section where you can enter the details about your
                financial situation and plan your goals.
            </div>
          </Col>
          <Col md={6} className="screenie">
            <div className="title">Import your portfolio</div>
            <img className="inline-block image" src="/importer.png"/>
            <div className="inline-block explanation">
              In the <a href="/#/Import">Import</a> section you can import or
              manually enter any investments you
              currently have.
            </div>
          </Col>
          <Col md={6} className="screenie">
            <div className="title">Track your investments</div>
            <img className="inline-block image" src="/portfolio.png"/>
            <div className="inline-block explanation">Head over the the <a href="/#/Planner">Planner</a> section where
              you can enter the details about your
              financial situation and plan your goals.
            </div>
          </Col>
          <Col md={6} className="screenie">
            <div className="title">Follow news & dividends</div>
            <img className="inline-block image" src="/news.png"/>
            <div className="inline-block explanation">In the <a href="/#/Import">Import</a> section you can import or
              manually enter any investments you
              currently have.
            </div>
          </Col>
        </Grid>
      </div>
    );
  }
}

QuickstartModule.displayName = 'QuickstartModule';

export default QuickstartModule;
