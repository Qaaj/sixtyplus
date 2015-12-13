import AppDispatcher from '../dispatcher/AppDispatcher.js';
import ModalConstants from '../constants/ModalConstants';

const ModalActionCreators = {
  /**
   * Options
   */
  setModal(options) {
    AppDispatcher.handleViewAction({
      actionType: ModalConstants.MODAL_SET,
      options: options,
    });
  },

  destroyModal() {
    AppDispatcher.handleViewAction({
      actionType: ModalConstants.MODAL_DESTROY,
    });
  },
};

export default ModalActionCreators;