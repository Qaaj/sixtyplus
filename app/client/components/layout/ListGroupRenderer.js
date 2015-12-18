import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

class ListGroupRenderer extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderColumnItem(item, i) {
    console.log('item ' , item.prop);
    return (
      <ListGroupItem key={i}>
        <span className="prop">{ item.prop }</span>

        <div className="val">{ item.value }</div>
      </ListGroupItem>);
  }

  _renderColumnItems(column) {
    console.log("Items");
    let group = column.map((item, i) => {
      this._renderColumnItem(item, i)
    });

    return (<ListGroup>
      { group }
    </ListGroup>);
  }

  _renderColumns() {
    console.log("Column");
    let columnsToRender = this.props.data;

    let columns = columnsToRender.map((column, i) => {
      return (<Col md={6} key={i}>
        { this._renderColumnItems(column) }
      </Col>);
    });

    return columns;
  }

  render() {
    let columns = this._renderColumns();
    console.log(columns);
    return columns;
  }
}

export default ListGroupRenderer;
