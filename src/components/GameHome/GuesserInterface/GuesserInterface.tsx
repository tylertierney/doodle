import React, { FC } from 'react';
import styles from './GuesserInterface.module.css';

interface GuesserInterfaceProps {}

const GuesserInterface: FC<GuesserInterfaceProps> = () => (
  <div className={styles.GuesserInterface} data-testid="GuesserInterface">
    GuesserInterface Component
  </div>
);

export default GuesserInterface;
