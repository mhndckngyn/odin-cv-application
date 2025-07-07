import clsx from 'clsx';
import styles from './FormButton.module.css';

const FormButton = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={clsx(styles['form__btn'], className)} {...props}>
    {children}
  </button>
);

export default FormButton;
