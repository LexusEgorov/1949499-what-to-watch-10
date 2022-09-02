import { FormEvent, Fragment, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { sendCommentAction } from '../../store/api-actions';

const ratings = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const COMMENT_MIN_LENGTH = 50;
const COMMENT_MAX_LENGTH = 400;

function FormComment() : JSX.Element{
  const dispatch = useAppDispatch();
  const {currentFilm} = useAppSelector((state) => state);
  const [formState, setFormState] = useState({rating: 0, comment: '', isValide: false});
  const [isFormActive, setIsFormActive] = useState(true);
  const {rating, comment, isValide} = formState;

  const validateForm = (text : string, rate: number) => (rate !== 0 && text.length >= COMMENT_MIN_LENGTH && text.length <= COMMENT_MAX_LENGTH);

  const submitHandler = (evt : FormEvent) => {
    evt.preventDefault();
    setIsFormActive(false);
    dispatch(sendCommentAction({comment: comment, rating: rating, filmId: currentFilm.id}));
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={submitHandler}>
        <div className="rating">
          <div className="rating__stars">
            {
              ratings.map((rate) => (
                <Fragment key={rate}>
                  <input className="rating__input" id={`star-${rate}`} type="radio" name="rating" value={rate}
                    disabled={!isFormActive}
                    onChange={(evt) => setFormState({...formState, rating: Number(evt.target.value), isValide: validateForm(comment, Number(evt.target.value))})}
                  />
                  <label className="rating__label" htmlFor={`star-${rate}`}>Rating {rate}</label>
                </Fragment>
              ))
            }
          </div>
        </div>
        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
            onInput={(evt) => setFormState({...formState, comment: evt.currentTarget.value, isValide: validateForm(evt.currentTarget.value, rating)})}
            value={comment}
            disabled={!isFormActive}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit"
              disabled={!isValide || !isFormActive}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormComment;
