import styles from './styles.module.scss'

type AlertProps = {
  text: string;
  color: string;
}

export function Alert(props: AlertProps) {
  return(
    <div className={props.color == 'g' ? styles.success : styles.failure}>
      <p>props.message</p>
    </div>
  );
}