import { useState } from 'react';
import styles from '../../Form.module.css';
import InputGroup, { InputDetail } from '../components/InputGroup';

export default function Info() {
  const [value, setValue] = useState<PersonalInfo>({});

  const inputDetail: InputDetail<PersonalInfo>[] = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'e.g. John Doe',
      attribute: 'name',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'e.g. johndoe@example.com',
      tag: 'recommended',
      attribute: 'email',
    },
    {
      id: 'number',
      label: 'Phone Number',
      type: 'text',
      placeholder: 'e.g. +44 212 555 4567',
      tag: 'recommended',
      attribute: 'number',
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'e.g. London, UK',
      tag: 'recommended',
      attribute: 'location',
    },
  ];

  return (
    <div className={styles['info']}>
      <h2 className={styles['info__title']}>Personal Information</h2>
      <form>
        <div>
          <InputGroup<PersonalInfo>
            detail={inputDetail}
            value={value}
            setValue={setValue}
          />
        </div>
      </form>
    </div>
  );
}

type PersonalInfo = {
  name?: string;
  email?: string;
  number?: string;
  location?: string;
};
