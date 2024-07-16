import { ReactNode } from "react";
import styles from "./ModalWindow.module.css";
type Props = {
  children?: ReactNode;
  w: string;
  h: string;
};
const ModalWindow = ({ children, w, h }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modalWindow} style={{ width: w, height: h }}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
