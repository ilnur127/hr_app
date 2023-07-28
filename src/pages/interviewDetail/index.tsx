import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {
  InterviewCandidateInfo,
  InterviewFeedback,
  InterviewMainInfo,
  InterviewNotes,
  InterviewQuestions,
  InterviewReviews,
  interviewModel,
} from '../../entities/interview'

import Loader from '../../entities/Loader'

import classes from './interviewDetail.module.css'

export function InterviewDetail() {
  const { interviewId } = useParams()

  const mainInfoData = useStore(interviewModel.$mainInfoData)
  const isLoadingMainInfo = useStore(interviewModel.$isLoadingMainInfo)
  const isSubmitingMainInfo = useStore(interviewModel.$isSubmitingMainInfo)

  const candidateInfo = useStore(interviewModel.$candidateInfoData)
  const isLoadingCandidateInfo = useStore(
    interviewModel.$isLoadingCandidateInfo
  )
  const isSubmitingCandidateInfo = useStore(
    interviewModel.$isSubmitingCandidateInfo
  )

  const notes = useStore(interviewModel.$notesData)
  const isLoadingNotes = useStore(interviewModel.$isLoadingNotes)
  const isCreatingNewNote = useStore(interviewModel.$isCreatingNewNote)
  const isEditingNote = useStore(interviewModel.$isEditingNote)

  const reviews = useStore(interviewModel.$reviewsData)
  const isLoadingReviews = useStore(interviewModel.$isLoadingReviews)
  const isCreatingNewReview = useStore(interviewModel.$isCreatingNewReview)
  const isEditingReview = useStore(interviewModel.$isEditingReview)

  const question = useStore(interviewModel.$questionData)
  const isSubmitingQuestion = useStore(interviewModel.$isSubmitingQuestion)
  const isLoadingQuestion = useStore(interviewModel.$isLoadingQuestion)

  const feedback = useStore(interviewModel.$feedbackData)
  const isSubmitingFeedback = useStore(interviewModel.$isSubmitingFeedback)
  const isLoadingFeedback = useStore(interviewModel.$isLoadingFeedback)

  useEffect(() => {
    interviewModel.loadMainInfo(interviewId)
  }, [interviewId])
  useEffect(() => {
    interviewModel.loadCandidateInfo(interviewId)
  }, [interviewId])
  useEffect(() => {
    interviewModel.getNotesEffect(interviewId)
  }, [interviewId])
  useEffect(() => {
    interviewModel.getReviewsEffect(interviewId)
  }, [interviewId])
  useEffect(() => {
    interviewModel.loadQuestions(interviewId)
  }, [interviewId])
  useEffect(() => {
    interviewModel.loadFeedback(interviewId)
  }, [interviewId])
  return (
    <>
      <div className={classes.headerBlock}>
        {!isLoadingMainInfo ? (
          <InterviewMainInfo
            loading={isSubmitingMainInfo}
            mainInfoData={mainInfoData}
            changeMainInfoData={interviewModel.changeMainInfoData}
            saveMainInfoChanging={() =>
              interviewModel.saveMainInfoChanging(interviewId)
            }
          />
        ) : (
          <Loader />
        )}
        {!isLoadingCandidateInfo ? (
          <InterviewCandidateInfo
            loading={isSubmitingCandidateInfo}
            candidateInfo={candidateInfo}
            changeCandidateInfo={interviewModel.changeCandidateInfo}
            saveCandidateChanging={(files) =>
              interviewModel.saveCandidateChanging({
                files,
                interviewId,
              })
            }
          />
        ) : (
          <Loader />
        )}
      </div>
      {!isLoadingNotes ? (
        <InterviewNotes
          loading={isCreatingNewNote || isEditingNote}
          notes={notes}
          addNewNote={(data) =>
            interviewModel.createNewNoteEffect({
              data,
              interviewId,
            })
          }
          editNote={(data) =>
            interviewModel.editNoteEffect({ data, interviewId })
          }
        />
      ) : (
        <Loader />
      )}
      {!isLoadingReviews ? (
        <InterviewReviews
          loading={isCreatingNewReview || isEditingReview}
          reviews={reviews}
          addNewReview={(data) =>
            interviewModel.createNewReviewEffect({
              data,
              interviewId,
            })
          }
          editReview={(data) =>
            interviewModel.editReviewEffect({ data, interviewId })
          }
        />
      ) : (
        <Loader />
      )}
      {!isLoadingQuestion ? (
        <InterviewQuestions
          loading={isSubmitingQuestion}
          question={question}
          changeQuestion={interviewModel.changeQuestion}
          saveQuestion={() => interviewModel.saveQuestion(interviewId)}
        />
      ) : (
        <Loader />
      )}
      {!isLoadingFeedback ? (
        <InterviewFeedback
          loading={isSubmitingFeedback}
          feedback={feedback}
          changeFeedbackData={interviewModel.changeFeedbackData}
          saveFeedbackData={() => interviewModel.saveFeedbackData(interviewId)}
        />
      ) : (
        <Loader />
      )}
    </>
  )
}
