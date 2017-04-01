import ConsoleCtrl from './consoleCtrl';
import RootCtrl from './rootCtrl';
import PortalCtrl from './portalCtrl';
import TreeCtrl from './component/treeCtrl';
import ModalCtrl from './component/modal/modalCtrl';
import DialogDemoCtrl from './component/modal/dialogDemoCtrl';
import EchartsCtrl from './component/echartsCtrl';
import DateRangePickerCtrl from './component/DateRangePickerCtrl';
import InputMaskCtrl from './component/InputMaskCtrl';
import Select2Ctrl from './component/Select2Ctrl';
import OtherComponentsCtrl from './component/OtherComponentsCtrl';
import OtherServicesCtrl from './component/OtherServicesCtrl';

export default app => {
  INCLUDE_ALL_MODULES([ConsoleCtrl, RootCtrl, PortalCtrl, TreeCtrl, ModalCtrl, DialogDemoCtrl,
    EchartsCtrl, DateRangePickerCtrl, InputMaskCtrl, Select2Ctrl, OtherComponentsCtrl, 
    OtherServicesCtrl], app);
}