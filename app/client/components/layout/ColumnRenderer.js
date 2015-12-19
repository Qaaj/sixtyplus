import { Col, Row } from 'react-bootstrap';

class ColumnRenderer extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderColumnItem(item, i) {
    return (<li className="prop" key={i}>{ item.prop }
      <span className="val">{ item.value }</span></li>);
  }

  _renderColumnItems(column) {
    return column.map((item, i) => {
      return this._renderColumnItem(item, i)
    });
  }

  _renderColumns(columnsToRender) {
    return columnsToRender.map((column, i) => {
      return (<Col {...this.props} key={i}>
        <ul className="list-unstyled small">
          { this._renderColumnItems(column) }
        </ul>
      </Col>);
    });
  }

  render() {
    let tickerData = this.props.data;
    let columns = this._renderColumns(tickerData);

    return (<div className="container-fluid">
      <h4>About {this.props.title}</h4>

      <Row>
        { columns }
      </Row>
    </div>);
  }
}

ColumnRenderer.displayName = 'ColumnRenderer';

export default ColumnRenderer;
