import { Panel , Label, Button, ListGroup, ListGroupItem, Well, Col} from 'react-bootstrap';
import {getUniqueColor, getClassBySector, getProfitLossClassname} from '../../../shared/helpers/colors/ColorUtils';
import HelpIcon from '../ui/HelpIcon';
import ModalActionCreators from '../../actions/ModalActionCreators';
import ModalConstants from '../../constants/ModalConstants';

class NewsItem extends React.Component {

  constructor(props) {

    super(props);
    this.key = "news_item_" + Math.floor(Math.random() * 10000);

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
    if (now.diff(date, 'days') < 7)  printDate = date.format("dddd");
    if (now.diff(date, 'days') === 0)  printDate = date.format("HH:MM");

    let content = this.props.news.summary.trim();
    var lines = content.split('\n');
    lines.splice(0,2);
    lines.splice(2,lines.length);
    let newcontent = lines.join('\n');
    newcontent = newcontent.replace("<br>","");
    const html = {__html: newcontent};


    let body = (
      <div key={this.key} className="news_item">
        <div className="top">
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
        <div dangerouslySetInnerHTML={html} className="bottom">
        </div>
      </div>
    );

    return body;
  }
}

NewsItem.displayName = 'NewsItem';

export default NewsItem;
