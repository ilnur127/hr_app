import clsx from 'clsx'

import classes from './index.module.css'
import { IFeedbackData } from '../../model'
import Loader from '../../../Loader'

type IInterviewFeedbackProps = {
  loading: boolean
  feedback: IFeedbackData
  changeFeedbackData: (data: IFeedbackData) => void
  saveFeedbackData: () => void
}
export const InterviewFeedback = ({
  loading,
  feedback,
  changeFeedbackData,
  saveFeedbackData,
}: IInterviewFeedbackProps) => {
  return (
    <div>
      <h2>Отзыв для соискателя</h2>
      <table className={clsx('UIKit_table', classes.feedbackTable)}>
        <thead>
          <tr>
            <td>Критерий</td>
            <td>Отзыв</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Первое впечателине от кандидата</td>
            <td>
              <textarea
                placeholder="Напишите отзыв"
                value={feedback.firstImpression}
                onChange={(e) =>
                  changeFeedbackData({
                    ...feedback,
                    firstImpression: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>Сильные стороны кандидата (soft и hard skills)</td>
            <td>
              <textarea
                placeholder="Напишите сильные стороны"
                value={feedback.strengths}
                onChange={(e) =>
                  changeFeedbackData({
                    ...feedback,
                    strengths: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>Слабые стороны кандидата</td>
            <td>
              <textarea
                placeholder="Напишите слабые стороны"
                value={feedback.weakSides}
                onChange={(e) =>
                  changeFeedbackData({
                    ...feedback,
                    weakSides: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>Общее впечатление</td>
            <td>
              <textarea
                placeholder="Напишите общее впечатление"
                value={feedback.allImpression}
                onChange={(e) =>
                  changeFeedbackData({
                    ...feedback,
                    allImpression: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>Рекомендации для кандидата</td>
            <td>
              <textarea
                placeholder="Напишите рекомандации"
                value={feedback.recommendations}
                onChange={(e) =>
                  changeFeedbackData({
                    ...feedback,
                    recommendations: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td>Дополнительно</td>
            <td>
              <textarea
                placeholder="Напишите отзыв"
                value={feedback.additionally}
                onChange={(e) =>
                  changeFeedbackData({
                    ...feedback,
                    additionally: e.target.value,
                  })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className={classes.saveFeedbackButton}
        onClick={() => saveFeedbackData()}
      >
        Сохранить
      </button>
      {loading && <Loader />}
    </div>
  )
}
