import {type SvgProps} from 'react-native-svg';
import InventoryNotFoundIcon from '@res/inventory_not_found_icon.svg';

const InventoryItemIcons: Record<string, React.FC<SvgProps>> = {
    'not_found': InventoryNotFoundIcon,
};

export default InventoryItemIcons;
