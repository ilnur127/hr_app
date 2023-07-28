import Loader from '../../../Loader'
import classes from './index.module.css'

type IInterviewQuestionsProps = {
  loading: boolean
  question: string
  changeQuestion: (q: string) => void
  saveQuestion: () => void
}
export const InterviewQuestions = ({
  loading,
  question,
  changeQuestion,
  saveQuestion,
}: IInterviewQuestionsProps) => {
  return (
    <div className={classes.questionsBlock}>
      <h2>Открытые вопросы</h2>
      <textarea
        placeholder="Перечислите любыые вопросы или моменты, относящиеся к кандидату, которые остались у вас после собеседования, чтобы другие интервьюеры могли продолжить общение на эти темы."
        value={question}
        onChange={(e) => changeQuestion(e.target.value)}
      />
      <button onClick={() => saveQuestion()}>Сохранить</button>
      {loading && <Loader />}
    </div>
  )
}
