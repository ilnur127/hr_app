import { useState } from 'react'
import classes from './index.module.css'

import type { IReview } from '../../model'
import Loader from '../../../Loader'

const NoteComponent = ({
  review,
  editReview,
}: {
  review: IReview
  editReview: (data: IReview) => void
}) => {
  const [formData, setFormData] = useState(review)
  return (
    <tr>
      <td>
        <textarea
          placeholder="Назовите и опишите каждое умение или способоность, которое вы смогли оценить во время собеседования."
          value={formData.skill}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              skill: e.target.value,
            }))
          }
        />
      </td>
      <td>
        <textarea
          placeholder="До собеседования примерно опишите, что означает каждая из оценок и запишите это здесь."
          value={formData.evaluationSection}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              evaluationSection: e.target.value,
            }))
          }
        />
      </td>
      <td>
        <input
          type="number"
          min={0}
          value={formData.grade}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              grade: e.target.value,
            }))
          }
        />
      </td>
      <td>
        <textarea
          placeholder="Объясните, почему вы поставили кандидату именно эту оценку ссылаясь на раздел оценок, приведите пару примеров, чтобы обосновать свою позицию."
          value={formData.description}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              description: e.target.value,
            }))
          }
        />
      </td>
      <td>
        <button onClick={() => editReview(formData)}>Редактирование</button>
      </td>
    </tr>
  )
}

const AddNoteComponent = ({
  addNewReview,
}: {
  addNewReview: (data: Omit<IReview, 'id'>) => void
}) => {
  const [formData, setFormData] = useState<Omit<IReview, 'id'>>({
    skill: '',
    evaluationSection: '',
    grade: '',
    description: '',
  })
  const [addingMode, setAddingMode] = useState(false)
  return addingMode ? (
    <>
      <div className={classes.addNewNote_row}>
        <div>
          <textarea
            placeholder="Назовите и опишите каждое умение или способоность, которое вы смогли оценить во время собеседования."
            value={formData.skill}
            onChange={(e) =>
              setFormData((old) => ({
                ...old,
                skill: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <textarea
            placeholder="До собеседования примерно опишите, что означает каждая из оценок и запишите это здесь."
            value={formData.evaluationSection}
            onChange={(e) =>
              setFormData((old) => ({
                ...old,
                evaluationSection: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <input
            type="number"
            min={0}
            value={formData.grade}
            onChange={(e) =>
              setFormData((old) => ({
                ...old,
                grade: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <textarea
            placeholder="Объясните, почему вы поставили кандидату именно эту оценку ссылаясь на раздел оценок, приведите пару примеров, чтобы обосновать свою позицию."
            value={formData.description}
            onChange={(e) =>
              setFormData((old) => ({
                ...old,
                description: e.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className={classes.actionRowButton}>
        <button
          onClick={() => {
            addNewReview(formData)
            setAddingMode(false)
          }}
        >
          Сохранить
        </button>
        <button
          onClick={() => {
            setFormData({
              skill: '',
              evaluationSection: '',
              grade: '',
              description: '',
            })
            setAddingMode(false)
          }}
        >
          Отменить
        </button>
      </div>
    </>
  ) : (
    <button
      className={classes.addRowButton}
      onClick={() => setAddingMode(true)}
    >
      Добавить
    </button>
  )
}

type IInterviewReviewsProps = {
  loading: boolean
  reviews: IReview[]
  addNewReview: (data: Omit<IReview, 'id'>) => void
  editReview: (data: IReview) => void
}
export const InterviewReviews = ({
  loading,
  reviews,
  editReview,
  addNewReview,
}: IInterviewReviewsProps) => {
  return (
    <div>
      <h2>Отзывы</h2>
      <small className={classes.smallPrompt}>
        Поставьте кандидату оценку от 1 (плохо) до 5 (отлично) за каждый его
        навык или способность. Учтите возможные собъективные факторы и обоснуйте
        свою оценку несколькими примерами из собеседования
      </small>
      <div className="UIKit_table">
        <table className={classes.reviewsTable}>
          <thead>
            <tr>
              <td>Умение или способность</td>
              <td>Раздел оценок</td>
              <td>Оценка</td>
              <td>Обоснование</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {reviews && Array.isArray(reviews) && reviews.length ? (
              reviews.map((review) => (
                <NoteComponent
                  key={review.id}
                  review={review}
                  editReview={editReview}
                />
              ))
            ) : (
              <tr>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
        <AddNoteComponent addNewReview={addNewReview} />
        {loading && <Loader />}
      </div>
    </div>
  )
}
