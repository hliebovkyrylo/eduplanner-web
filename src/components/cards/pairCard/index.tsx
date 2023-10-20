import { FC } from "react";

import styles from "./pairCard.module.scss";

interface PairCardProps {
  pairNumber: number;
  pairTitle: string;
  className?: string;
};

export const PairCard: FC<PairCardProps> = ({
  pairTitle,
  className,
}) => {
  return (
    <>
      <div className={[styles.card, className].join(' ')}>
        <span className={styles.pairTitle}>{pairTitle}</span>
      </div>
    </>
  )
};