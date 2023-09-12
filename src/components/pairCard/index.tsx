import { FC } from "react";

import styles from "./pairCard.module.scss";

interface PairCardProps {
  pairNumber: number;
  pairTitle: string;
  className?: string;
  _id: string;
};

export const PairCard: FC<PairCardProps> = ({
  pairNumber,
  pairTitle,
  className,
  _id
}) => {
  return (
    <>
      <div className={[styles.card, className].join(' ')}>
        <span className={styles.pairNumber}>{pairNumber}</span>
        <span className={styles.pairTitle}>{pairTitle}</span>
      </div>
    </>
  )
};