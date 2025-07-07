import clsx from 'clsx';
import styles from '../../Form.module.css';

/* 
  Values of the object T could be anything and therefore might not be assignable to inputs as their value.
  We are requiring T to be an object (record) with: 
    Keys of string type
    Values of the types allowed as input values
*/

export default function InputGroup<T extends Record<string, AllowedValue>>({
  detail,
  value,
  setValue,
}: Props<T>) {
  return detail.map(({ id, label, type, placeholder, tag, attribute }) => (
    <div key={id} className={styles['info__fieldContainer']}>
      <label className={styles['field__label']} htmlFor={id}>
        {label}
        {tag && (
          <span
            className={clsx(styles['field__tag'], {
              [styles['field__tag--recommended']]: tag === 'recommended',
              [styles['field__tag--optional']]: tag === 'optional',
            })}
          >
            {tag}
          </span>
        )}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value[attribute]}
          onChange={(event) =>
            setValue({
              ...value,
              [attribute]: event.target.value,
            })
          }
          id={id}
          rows={5}
          className={clsx(
            styles['field__input'],
            styles['field__textarea'],
          )}
          name={id}
          placeholder={placeholder}
        />
      ) : (
        <input
          value={value[attribute]}
          onChange={(event) =>
            setValue({
              ...value,
              [attribute]: event.target.value,
            })
          }
          className={styles['field__input']}
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  ));
}

type AllowedValue = string | number | readonly string[] | undefined;

type Props<T> = {
  detail: InputDetail<T>[];
  value: T;
  setValue: (newValue: T) => void;
};

export type InputDetail<T> = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  tag?: 'recommended' | 'optional';
  attribute: keyof T;
};
