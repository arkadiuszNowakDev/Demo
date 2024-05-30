import styles from './SampleTile.module.scss';

export type SampleTileProps = {
  imageSource: string;
  title: string;
  onClick: () => void;
};

const SampleTile = (props: SampleTileProps): JSX.Element => {
  return (
    <div className={styles.sampleTile} onClick={props.onClick}>
      <img src={props.imageSource} alt={`${props.title}`} draggable='false' />
      <p>{props.title}</p>
    </div>
  );
};

export default SampleTile;
