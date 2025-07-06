import clsx from 'clsx';
import styles from './FormContent.module.css';

export default function Info() {
  const fields: Field[] = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'e.g. John Doe',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'e.g. johndoe@example.com',
      tag: 'recommended',
    },
    {
      id: 'number',
      label: 'Phone Number',
      type: 'text',
      placeholder: 'e.g. +44 212 555 4567',
      tag: 'recommended',
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'e.g. London, UK',
      tag: 'recommended',
    },
  ];

  return (
    <div className={styles.info}>
      <h2 className={styles['info__title']}>Personal Information</h2>
      <form>
        <div>
          {fields.map(({ id, label, type, placeholder, tag }) => (
            <div key={id} className={styles['info__fieldContainer']}>
              <label className={styles['field__label']} htmlFor={id}>
                {label}
                {tag && (
                  <span
                    className={clsx(styles['field__tag'], {
                      [styles['field__tag--recommended']]:
                        tag === 'recommended',
                      [styles['field__tag--optional']]: tag === 'optional',
                    })}
                  >
                    {tag}
                  </span>
                )}
              </label>
              <input
                className={styles['field__input']}
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

type Field = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  tag?: 'recommended' | 'optional';
};
