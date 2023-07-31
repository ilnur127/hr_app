import {
  createStore,
  createEvent,
  createEffect,
  forward,
  sample,
} from 'effector'

export type IFeedbackData = {
  firstImpression: string
  strengths: string
  weakSides: string
  allImpression: string
  recommendations: string
  additionally: string
}

export const changeFeedbackData = createEvent<IFeedbackData>()
export const saveFeedbackData = createEvent<string | undefined>()
export const loadFeedback = createEvent<string | undefined>()

const loadFeedbackFx = createEffect(async (interviewId: string | undefined) => {
  // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/feedback`)
  const response = await fetch(`http://localhost:3001/feedback`)
  const result = await response.json()
  console.log(interviewId)
  return result
})
const submitFeedbackData = createEffect(
  async ({
    data,
    interviewId,
  }: {
    data: IFeedbackData
    interviewId: string | undefined
  }) => {
    console.log(interviewId)
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/feedback`,
    const response = await fetch(`http://localhost:3001/feedback`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    return result
  }
)

export const $feedbackData = createStore<IFeedbackData>({
  firstImpression: '',
  strengths: '',
  weakSides: '',
  allImpression: '',
  recommendations: '',
  additionally: '',
})

sample({
  clock: loadFeedback,
  target: loadFeedbackFx,
})
sample({
  clock: loadFeedbackFx.doneData,
  target: $feedbackData,
})

forward({
  from: changeFeedbackData,
  to: $feedbackData,
})

sample({
  clock: saveFeedbackData,
  source: $feedbackData,
  target: submitFeedbackData,
  fn: (store, interviewId) => ({ data: store, interviewId }),
})

export const $isSubmitingFeedback = submitFeedbackData.pending
export const $isLoadingFeedback = loadFeedbackFx.pending
