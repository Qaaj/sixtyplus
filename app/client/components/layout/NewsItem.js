import { Panel , Label, Button, ListGroup, ListGroupItem, Well, Col} from 'react-bootstrap';
import {getUniqueColor, getClassBySector, getProfitLossClassname} from '../../../shared/helpers/colors/ColorUtils';
import HelpIcon from '../ui/HelpIcon';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';

class NewsItem extends React.Component {

  constructor(props) {

    super(props);
    this.key = "news_item_" + Math.floor(Math.random()*10000);

  }

  handleClick() {
    ModalActionCreators.setModal({
      isVisible: true,
      type: ModalConstants.NEWS_ITEM,
      data: this.props.news,
    });
  }

  render() {

    let now = new moment();
    let date = moment(this.props.news.date);

    let printDate = date.format("MMMM Do");
    if(now.diff(date,'days') < 7)  printDate = date.format("dddd");
    if(now.diff(date,'days') === 0)  printDate = date.format("HH:MM");;



    let body = (
      <div key={this.key} className="news_item">
        <span className="icon">
          <HelpIcon placement="right" title={this.props.news.title} icon="remove_red_eye" content={this.props.lang('html:' + this.props.news.summary)}/>
        </span>
        <span className="stockName">
          {this.props.news.ticker}
        </span>
        <span className="title">
          <a onClick={this.handleClick.bind(this)}>{this.props.news.title}</a>
        </span>
         <span className="date">
          {printDate}
        </span>
      </div>
    );

    return body;
  }
}

NewsItem.displayName = 'NewsItem';

export default NewsItem;
