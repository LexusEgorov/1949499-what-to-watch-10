import { MONTHS } from '../../const';
import { CommentType } from '../../types/comments';

type CommentProps = {
  commentary: CommentType;
}

function Comment({commentary} : CommentProps) : JSX.Element {
  const {comment, user, rating, date} = commentary;

  const formattedDate = new Date(date);
  const month = formattedDate.getMonth();
  const day = formattedDate.getDate();
  const year = formattedDate.getFullYear();
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>
        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date}>{`${MONTHS[month]} ${day}, ${year}`}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default Comment;
