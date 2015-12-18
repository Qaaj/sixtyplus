

class AnalysisModule extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = this.props.data;

    let itemsToRender = items.map((item, i) => {
      return (<div key={i} className="col-xs-4">
              <span>
                <img style={{width:75,height:75}} src={item.image}/>
                <p>{item.description}</p>
              </span>
      </div>);
    });

    return (<div className="container-fluid">
      <h4>Analysis</h4>

      <div className="row">
        { itemsToRender }
      </div>
    </div>);
  }
}

export default AnalysisModule;
