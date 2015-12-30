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
            <div className="inline-block explanation">After importing your investments, you can track the performance of your portfolio in the  <a href="/#/Portfolio">Portfolio</a> section.
            </div>
          </Col>
          <Col md={6} className="screenie">
            <div className="title">Follow news & dividend payouts</div>
            <img className="inline-block image" src="/news.png"/>
            <div className="inline-block explanation">Keep track of <a href="/#/News">news</a> and  <a href="/#/Dividends">dividend payments</a> for all the stocks in your portfolio.
            </div>
          </Col>
        </Grid>
      </div>
    );
  }
}

QuickstartModule.displayName = 'QuickstartModule';

export default QuickstartModule;
