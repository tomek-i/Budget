import { FormEvent } from 'react';

export interface FormProps {
  className?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
export const Form: React.FC<FormProps> = ({
  className,
  children,
  onSubmit,
}) => {
  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      {children}
    </form>
  );
};
