import { createEffect, createEvent, createStore, forward } from "effector";

export type IPositionLevel =
  | ''
  | 'trainee'
  | 'junior'
  | 'pre-middle'
  | 'middle'
  | 'pre-senior'
  | 'senior'
export type IHireStatus = '' | 'hire' | 'refuse'

export type IMainInfoData = {
    fio: string
    interviewer: string
    hr_user: string
    positionName: string
    positionLevel: IPositionLevel
    hireStatus: IHireStatus
    justification: string
}

export type INote = {
    id?: number
    question: string
    description: string
    state: 'new' | 'edit' | 'saved'
}

export type IReview = {
    id?: number
    skill: string
    evaluationSection: string
    grade: string
    description: string
    state: 'new' | 'edit' | 'saved'
}

export type IFeedbackData = {
    firstImpression: string
    strengths: string
    weakSides: string
    allImpression: string
    recommendations: string
    additionally: string
}

type IInterviewData = {
    id: number,
    mainInfo: IMainInfoData,
    candidateInfo: {
        candidateInfo: string,
        file: object
    }
    notes: INote[],
    reviews: IReview[],
    question: string,
    feedback: IFeedbackData
}

export const loadInterviewInfo = createEffect(
    async (interviewId: string | undefined): Promise<IInterviewData> => {
      const response = await fetch(`http://localhost:3001/interviews/${interviewId}`)
      const result = await response.json()
      return result
    }
)
export const submitInterviewInfo = createEffect(
    async (interviewId: string | undefined, data: IInterviewData): Promise<IInterviewData> => {
      const response = await fetch(`http://localhost:3001/interviews/${interviewId}`,
        {
            method: 'POST',
            body: JSON.stringify(data)
        }
        )
      const result = await response.json()
      loadInterviewInfo(interviewId)
      return result
    }
)

/* mainInfo */
export const $mainInfoData = createStore<IMainInfoData>({
    fio: '',
    interviewer: '',
    hr_user: '',
    positionName: '',
    positionLevel: '',
    hireStatus: '',
    justification: '',
}).on(loadInterviewInfo.doneData, (_store, interviewerInfo) => interviewerInfo.mainInfo)

export const changeMainInfoData = createEvent<IMainInfoData>()

forward({
    from: changeMainInfoData,
    to: $mainInfoData,
})
/* ------- */

/* candidateInfo */
export const $candidateInfoData = createStore('').on(
    loadInterviewInfo.doneData,
    (_store, interviewerInfo) => interviewerInfo.candidateInfo.candidateInfo
)

export const changeCandidateInfo = createEvent<string>()

forward({
    from: changeCandidateInfo,
    to: $candidateInfoData,
})
/* --------- */

/* notes */

export const createNewNote = createEvent<INote>()
export const editNote = createEvent<INote>()

export const $notesData = createStore<INote[]>([])
  .on(loadInterviewInfo.doneData, (_store, interviewerInfo) => interviewerInfo.notes.map(note => ({...note, state: 'saved'})))
  .on(createNewNote, (store, newNote) => [...store, {...newNote, state: 'new'}])
  .on(editNote, (store, editNote) =>
    store.map((note) => (note.id === editNote.id ? {...editNote, state: 'edit'} : note))
  )
/* --------- */

/* reviews */
export const createNewReview = createEvent<IReview>()
export const editReview = createEvent<IReview>()

export const $reviewsData = createStore<IReview[]>([])
  .on(loadInterviewInfo.doneData, (_store, interviewerInfo) => interviewerInfo.reviews)
  .on(createNewReview, (store, newReview) => [
    ...store,
    {...newReview, state: 'new'},
  ])
  .on(editReview, (store, editReview) =>
    store.map((review) => (review.id === editReview.id ? {...editReview, state: 'edit'} : review))
  )

/* -------- */

/* questions */

export const $questionData = createStore('').on(
    loadInterviewInfo.doneData,
    (_store, interviewerInfo) => interviewerInfo.question
)

export const changeQuestion = createEvent<string>()

forward({
    from: changeQuestion,
    to: $questionData,
})

/* -------- */

/* feedback */
export const $feedbackData = createStore<IFeedbackData>({
    firstImpression: '',
    strengths: '',
    weakSides: '',
    allImpression: '',
    recommendations: '',
    additionally: '',
}).on(loadInterviewInfo.doneData, (_store, interviewerInfo) => interviewerInfo.feedback)

export const changeFeedbackData = createEvent<IFeedbackData>()

forward({
    from: changeFeedbackData,
    to: $feedbackData,
})
/* -------- */

export const $isSubmitingInterview = submitInterviewInfo.pending
export const $isLoadingInterview = loadInterviewInfo.pending