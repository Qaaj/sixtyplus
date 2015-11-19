import PureRenderMixin from 'react-addons-pure-render-mixin';

export function pureRenderDecorator(Component) {
  Component.prototype.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;
}
