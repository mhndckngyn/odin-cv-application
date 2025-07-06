import clsx from 'clsx';
import {
  BriefcaseBusiness,
  GraduationCap,
  SquareUserRound,
} from 'lucide-react';
import { useState } from 'react';
import styles from './Form.module.css';
import Education from './partials/Education';
import Experience from './partials/Experience';
import Info from './partials/Info';

export default function Form() {
  const [tab, setTab] = useState<Tab>('PERSONAL_INFO');

  const tabButtons: TabButton[] = [
    {
      label: 'Personal Information',
      icon: SquareUserRound,
      tab: 'PERSONAL_INFO',
    },
    {
      label: 'Education',
      icon: GraduationCap,
      tab: 'EDUCATION',
    },
    {
      label: 'Experience',
      icon: BriefcaseBusiness,
      tab: 'EXPERIENCE',
    },
  ];

  return (
    <div className={styles['form']}>
      <div className={styles['form__tabContainer']}>
        {tabButtons.map((button, i) => (
          <button
            key={i}
            className={clsx(
              styles['form__tabButton'],
              tab === button.tab && styles['form__tabButton--highlighted'],
            )}
            onClick={() => setTab(button.tab)}
          >
            <button.icon />
          </button>
        ))}
      </div>

      <div className={styles['form__content']}>
        {tab === 'PERSONAL_INFO' ? (
          <Info />
        ) : tab === 'EDUCATION' ? (
          <Education />
        ) : (
          <Experience />
        )}
      </div>
    </div>
  );
}

type Tab = 'PERSONAL_INFO' | 'EDUCATION' | 'EXPERIENCE';

type TabButton = {
  label: string;
  icon: React.FC;
  tab: Tab;
};
