import PureRenderMixin from 'react-addons-pure-render-mixin';
import AutoSave from '../../client/config/AutoSave';

export function pureRenderDecorator(Component) {
  Component.prototype.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
}

export function nameCreator(Component) {
  Component.prototype.name = Component.name;
}

export function autoSaver(Component) {
 if(AutoSave[Component.name]) Component.prototype.saveObject = AutoSave[Component.name];
}
