import styles from './SampleTile.module.scss';

export type SampleTileProps = {
  imageSource: string;
  title: string;
};

const SampleTile = (props: SampleTileProps): JSX.Element => {
  return (
    <div className={styles.sampleTile}>
      <img src={props.imageSource} alt={`${props.title}`} />
      <p>{props.title}</p>
    </div>
  );
};

export default SampleTile;
