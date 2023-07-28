import { useRef, useState } from 'react'

import classes from './index.module.css'
import Loader from '../../../Loader'

type IInterviewCandidateInfoProps = {
  loading: boolean
  candidateInfo: string
  changeCandidateInfo: (newInfo: string) => void
  saveCandidateChanging: (data: FileList | null | undefined) => void
}
export const InterviewCandidateInfo = ({
  loading,
  candidateInfo,
  changeCandidateInfo,
  saveCandidateChanging,
}: IInterviewCandidateInfoProps) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')
  return (
    <div>
      <h2>Информация о кандидате</h2>
      <textarea
        className={classes.infoAboutUserBlock}
        placeholder="Включите всю информацию, которую вы получили о кандидате или роли, а также любые инструкции, которые вы получили от менеджера по подбору персонала."
        value={candidateInfo}
        onChange={(e) => changeCandidateInfo(e.target.value)}
      />
      <input
        type="file"
        id="fileAboutCandidate"
        hidden
        ref={fileRef}
        onChange={(e) => e.target.files && setFileName(e.target.files[0].name)}
      />
      {fileName ? (
        <div className={classes.fileBox}>
          <span>{fileName}</span>
          <button
            onClick={() => {
              if (fileRef.current) {
                fileRef.current.files = null
                setFileName('')
              }
            }}
          >
            Удалить
          </button>
        </div>
      ) : (
        <label className={classes.fileBox} htmlFor="fileAboutCandidate">
          Прикрепить файл
        </label>
      )}
      <button
        className={classes.saveCandidateInfoButton}
        onClick={() => saveCandidateChanging(fileRef.current?.files)}
      >
        Сохранить
      </button>
      {loading && <Loader />}
    </div>
  )
}
