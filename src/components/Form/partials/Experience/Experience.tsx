import { useState } from 'react';
import { generateId, toMonthString } from '@/utils';
import styles from './Experience.module.css';
import FormButton from '../components/FormButton';
import commonStyles from '../../Form.module.css';
import InputGroup, { InputDetail } from '../components/InputGroup';

export default function Experience() {
  const [view, setView] = useState<TabView>('add');
  const [items, setItems] = useState<ExperienceItem[]>([]);

  /* Manage input values */
  const [inputValue, setInputValue] = useState<InputValue>({});

  /* Interact with states */
  const addItem = () => {
    const newItem: ExperienceItem = { ...inputValue, id: generateId() };
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

  /* Control handlers */
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

  /* Form detail */
  const inputDetail: InputDetail<InputValue>[] = [
    {
      id: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'e.g. GitHub Inc.',
      attribute: 'company',
    },
    {
      id: 'position',
      label: 'Position',
      type: 'text',
      placeholder: 'e.g. Software Engineer Intern',
      attribute: 'position',
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
      tag: 'optional',
      attribute: 'endDate',
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'e.g. , Germany',
      tag: 'optional',
      attribute: 'location',
    },
    {
      id: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Responsibilities or achievements',
      tag: 'optional',
      attribute: 'description',
    },
  ];

  /* Render list of item */
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
        <p className={styles['listItem__company']}>{item.company}</p>
        <p className={styles['listItem__position']}>{item.position}</p>
      </button>

      {i !== items.length - 1 && <div className={styles['list__spacer']} />}
    </>
  ));

  /* Controls shown when adding an item */
  const addFormControls = (
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
  );

  /* Controls shown when editing an item */
  const editFormControls = (
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
  );

  return (
    <div className={commonStyles.info}>
      <h2 className={commonStyles['info__title']}>Work Experience</h2>
      {view === 'list' ? (
        /* Show list of item */
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
        /* Show the form for adding or editing */
        <div>
          <div>
            <InputGroup<InputValue>
              detail={inputDetail}
              value={inputValue}
              setValue={setInputValue}
            />
          </div>
          {view === 'add' ? addFormControls : editFormControls}
        </div>
      )}
    </div>
  );
}

type TabView = 'list' | 'edit' | 'add';

type ExperienceItem = {
  id?: string;
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
};

type InputValue = Partial<ExperienceItem>;
