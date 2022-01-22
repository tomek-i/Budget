import React from 'react';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faTrashAlt,
  faMinusCircle,
  faMinusSquare,
  faEraser,
  faBackspace,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEdit as editAlt,
  faTrashAlt as faTrashAlt2,
  faMinusSquare as faMinusSquare2,
} from '@fortawesome/free-regular-svg-icons';
import '../../../css/style.scss';
export let iconTypes = {
  trash: faTrash,
  trashalt: faTrashAlt,
  trashalt2: faTrashAlt2,
  minusCirlce: faMinusCircle,
  minusSquare: faMinusSquare,
  eraser: faEraser,
  backspace: faBackspace,
  edit: faEdit,
  editAlt: editAlt,
};

export type FontAwesomeIconProps = {
  className?: string;
  color?: string;
  type:
    | 'trash'
    | 'trashalt'
    | 'trashalt2'
    | 'minusCirlce'
    | 'minusSquare'
    | 'eraser'
    | 'backspace'
    | 'edit'
    | 'editAlt';
};

export const FontAwesomeIcon: React.FC<FontAwesomeIconProps> = ({
  type,
  color,
  className,
}) => {
  return <FAI color={color} className={className} icon={iconTypes[type]} />;
};
