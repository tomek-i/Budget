import '../../../../css/style.scss';

/**
 * Button Props
 */
export interface ButtonProps {
  /**
   * the button text to display
   */
  text?: string;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Component for showing a button.
 *
 * @param text the button text to display.
 * @param name the name to use for the button.
 * @param disabled determines if the button is disabled or not.
 * @param childrenAlign use left to use the children before the text and
 *                      use right to show the text before any children
 * @param children any children to render
 * @param className any additional class names to add
 * @component
 * @example
 *   <Button text={'hello world'} />
 */
export const Button: React.FC<ButtonProps> = ({
  text,
  name,
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      type={'button'}
      name={name}
      className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
};
