import { NextPage } from 'next';
import React from 'react';
import styles from '../../../styles/components/atoms/Card.module.css';

interface Card {
  title?: string;
  flow?: 'row' | 'column';
  width?: string;
  alignTitle?: 'center' | 'right' | 'left';
  uppercase?: boolean;
}
const Card: NextPage<Card> = ({
  title,
  flow,
  width,
  alignTitle,
  children,
  uppercase = false,
}) => {
  return (
    <div className={styles.card} style={{ width: width }}>
      {title && (
        <h2
          style={{
            textAlign: alignTitle,
            textTransform: uppercase ? 'uppercase' : 'unset',
          }}
        >
          {title}
        </h2>
      )}
      <div style={{ flexDirection: flow }}>{children}</div>
    </div>
  );
};

export default Card;
