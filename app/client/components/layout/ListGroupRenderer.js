import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

class ListGroupRenderer extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderColumnItem(item, i) {
    return (<ListGroupItem key={i} bsStyle={item.listGroupItemStyle}>
      <span className="prop">{ item.prop }</span>

      <div className="val">{ item.value ? item.value: '-' }</div>
    </ListGroupItem>);
  }

  _renderColumnItems(column) {
    return column.map((item, i) => {
      return this._renderColumnItem(item, i)
    });
  }

  _renderColumns(columnsToRender) {
    return columnsToRender.map((column, i) => {
      return (

        <Col {...this.props} key={i}>
          <ListGroup>
          { this._renderColumnItems(column) }
        </ListGroup>
      </Col>);
    });
  }

  render() {
    let columnsToRender = this._renderColumns(this.props.data);

    return (<div>
      { columnsToRender }
    </div>);
  }
}

ListGroupRenderer.displayName = 'ListGroupRenderer';

export default ListGroupRenderer;
