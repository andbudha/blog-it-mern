import { CommentaryValues } from '../../types/common_types';
import { Commentary } from '../Commentary/Commentray';
import styles from './CommentaryBand.module.scss';
type CommentaryBandProps = {
  commentaries: CommentaryValues[];
};
export const CommentaryBand = ({ commentaries }: CommentaryBandProps) => {
  const commentaryList = commentaries.map((commentary) => (
    <Commentary key={commentary._id} commentary={commentary} />
  ));
  return <div className={styles.main_commentary_bandBox}>{commentaryList}</div>;
};
