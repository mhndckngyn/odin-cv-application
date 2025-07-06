import clsx from 'clsx';
import { useState } from 'react';
import { generateId, toMonthString } from '../../../utils';
import styles from './Experience.module.css';
import commonStyles from './FormContent.module.css';

export default function Education() {
  const [view, setView] = useState<TabView>('add');
  const [items, setItems] = useState<EducationItem[]>([]);
  const [fieldValues, setFieldValues] = useState<FieldData>({});

  const addItem = () => {
    const newItem: EducationItem = { ...fieldValues, id: generateId() };
    setItems([...items, newItem]);
    setFieldValues({});
  };

  const saveCurrentItem = () => {
    if (!fieldValues) {
      return;
    }

    const id = fieldValues.id;
    const updated = items.map((item) => {
      if (item.id !== id) {
        return item;
      }

      return fieldValues;
    });

    setItems(updated);
  };

  const deleteCurrentItem = () => {
    if (!fieldValues) {
      return;
    }

    const deleted = items.filter((item) => item.id !== fieldValues.id);
    setItems(deleted);
    setView('list');
  };

  const fieldInfo: Field[] = [
    {
      id: 'school',
      label: 'School',
      type: 'text',
      placeholder: 'School / University / Institution',
      attribute: 'school',
    },
    {
      id: 'degree',
      label: 'Degree',
      type: 'text',
      placeholder: 'Degree / Field of Study',
      attribute: 'degree',
    },
    {
      id: 'start',
      label: 'Start date',
      type: 'date',
      placeholder: '',
      attribute: 'startDate',
    },
    {
      id: 'end',
      label: 'End date',
      type: 'date',
      placeholder: '',
      attribute: 'endDate',
      tag: 'optional',
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Location of Study',
      tag: 'optional',
      attribute: 'location',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Achievements or notes',
      tag: 'optional',
      attribute: 'description',
    },
  ];

  const fields = fieldInfo.map(
    ({ id, label, type, placeholder, tag, attribute }) => (
      <div key={id} className={commonStyles['info__fieldContainer']}>
        <label className={commonStyles['field__label']} htmlFor={id}>
          {label}
          {tag && (
            <span
              className={clsx(commonStyles['field__tag'], {
                [commonStyles['field__tag--recommended']]:
                  tag === 'recommended',
                [commonStyles['field__tag--optional']]: tag === 'optional',
              })}
            >
              {tag}
            </span>
          )}
        </label>
        {type === 'textarea' ? (
          <textarea
            value={fieldValues[attribute]}
            onChange={(event) =>
              setFieldValues({
                ...fieldValues,
                [attribute]: event.target.value,
              })
            }
            id={id}
            rows={5}
            className={clsx(
              commonStyles['field__input'],
              commonStyles['field__textarea'],
            )}
            name={id}
            placeholder={placeholder}
          />
        ) : (
          <input
            value={fieldValues[attribute]}
            onChange={(event) =>
              setFieldValues({
                ...fieldValues,
                [attribute]: event.target.value,
              })
            }
            className={commonStyles['field__input']}
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
          />
        )}
      </div>
    ),
  );

  const loadItemToEdit = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setFieldValues(item);
      setView('edit');
    }
  };

  const handleShowAddForm = () => {
    setFieldValues({});
    setView('add');
  };

  const handleAddItem = () => {
    addItem();
    setView('list');
  };

  const handleSaveItem = () => {
    saveCurrentItem();
    setView('list');
  };

  const handleDeleteItem = () => {
    deleteCurrentItem();
    setView('list');
  };

  const handleCancelEdit = () => {
    setView('list');
  };

  const itemList = items.map((item, i) => (
    <>
      <button
        onClick={() => loadItemToEdit(item.id!)}
        key={item.id}
        className={styles['list__item']}
      >
        <p className={styles['listItem__date']}>
          {toMonthString(item.startDate ?? '')}
          {item.endDate && `–${toMonthString(item.endDate)}`}
        </p>
        <p className={styles['listItem__company']}>{item.school}</p>
        <p className={styles['listItem__position']}>{item.degree}</p>
      </button>

      {i !== items.length - 1 && <div className={styles['list__spacer']} />}
    </>
  ));

  return (
    <div className={commonStyles.info}>
      <h2 className={commonStyles['info__title']}>Education</h2>
      {view === 'list' ? (
        <div className={styles['list__container']}>
          {itemList}
          <button
            className={styles['list__addBtn']}
            onClick={handleShowAddForm}
          >
            New Item
          </button>
        </div>
      ) : (
        <div>
          <div>{fields}</div>
          {view === 'add' && (
            <div className={styles['form__buttonContainer']}>
              <div className={styles['buttonContainer__spacer']} />
              <FormButton
                className={styles['form__btn--cancel']}
                onClick={handleCancelEdit}
              >
                Cancel
              </FormButton>
              <FormButton
                className={styles['form__btn--confirm']}
                onClick={handleAddItem}
              >
                Add
              </FormButton>
            </div>
          )}
          {view === 'edit' && (
            <div className={styles['form__buttonContainer']}>
              <FormButton
                className={styles['form__btn--delete']}
                onClick={handleDeleteItem}
              >
                Delete
              </FormButton>
              <div className={styles['buttonContainer__spacer']} />
              <FormButton
                className={styles['form__btn--cancel']}
                onClick={handleCancelEdit}
              >
                Cancel
              </FormButton>
              <FormButton
                className={styles['form__btn--confirm']}
                onClick={handleSaveItem}
              >
                Save
              </FormButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const FormButton = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={clsx(styles['form__btn'], className)} {...props}>
    {children}
  </button>
);

type TabView = 'list' | 'edit' | 'add';

type Field = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  tag?: 'recommended' | 'optional';
  attribute: keyof FieldData;
};

type EducationItem = {
  id?: string;
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
};

type FieldData = Partial<EducationItem>;
