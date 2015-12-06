/**
 * Pure component
 */

function SectorComponent(props) {
  return (
    <div className="sectorComponent">
      <div className={'sector-square ' + props.cx}></div>
      <div className="sector-name">{props.sector}</div>
    </div>
  );
}

SectorComponent.displayName = 'SectorComponent';

export default SectorComponent;
