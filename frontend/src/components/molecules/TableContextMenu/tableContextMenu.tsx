import { Children } from 'react';
import { ContextMenu } from '../ContextMenu/contextMenu';
import { ContextMenuItem } from '../ContextMenu/contextMenuItem';

interface TableContextMenuProps {
  visible: boolean;
}

export const TableContextMenu: React.FC<TableContextMenuProps> = ({
  visible,
}) => {
  return (
    <ContextMenu visible={visible}>
      <ContextMenuItem text={'test'}></ContextMenuItem>
      <ContextMenuItem text={'-'}></ContextMenuItem>
      <ContextMenuItem text={'test111'} enabled={false}></ContextMenuItem>
      <ContextMenuItem text={'test'}></ContextMenuItem>
    </ContextMenu>
  );
};
