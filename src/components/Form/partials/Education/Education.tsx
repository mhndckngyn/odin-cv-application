import { useState } from 'react';
import { generateId, toMonthString } from '@/utils';
import styles from './Education.module.css';
import FormButton from '../components/FormButton';
import commonStyles from '../../Form.module.css';
import InputGroup, { InputDetail } from '../components/InputGroup';

export default function Education() {
  const [view, setView] = useState<TabView>('add');
  const [items, setItems] = useState<EducationItem[]>([]);
  const [inputValue, setInputValue] = useState<InputValue>({});

  const addItem = () => {
    const newItem: EducationItem = { ...inputValue, id: generateId() };
    setItems([...items, newItem]);
    setInputValue({});
  };

  const saveCurrentItem = () => {
    if (!inputValue) {
      return;
    }

    const id = inputValue.id;
    const updated = items.map((item) => {
      if (item.id !== id) {
        return item;
      }

      return inputValue;
    });

    setItems(updated);
  };

  const deleteCurrentItem = () => {
    if (!inputValue) {
      return;
    }

    const deleted = items.filter((item) => item.id !== inputValue.id);
    setItems(deleted);
    setView('list');
  };

  const inputDetail: InputDetail<InputValue>[] = [
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

  const loadItemToEdit = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setInputValue(item);
      setView('edit');
    }
  };

  const handleShowAddForm = () => {
    setInputValue({});
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

  const addFormControls = (
    <>
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
    </>
  );

  const editFormControls = (
    <>
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
    </>
  );

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
          <div>
            <InputGroup<InputValue>
              detail={inputDetail}
              value={inputValue}
              setValue={setInputValue}
            />
          </div>
          <div className={styles['form__buttonContainer']}>
            {view === 'add' ? addFormControls : editFormControls}
          </div>
        </div>
      )}
    </div>
  );
}

type TabView = 'list' | 'edit' | 'add';

type EducationItem = {
  id?: string;
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
};

type InputValue = Partial<EducationItem>;
