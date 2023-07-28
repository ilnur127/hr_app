import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from 'effector'

export const changeQuestion = createEvent<string>()
export const saveQuestion = createEvent<string | undefined>()

export const loadQuestions = createEffect(
  async (interviewId: string | undefined) => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/question`)
    const response = await fetch(`http://localhost:3001/question`)
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)
const submitQuestion = createEffect(
  async ({
    question,
    interviewId,
  }: {
    question: string
    interviewId: string | undefined
  }) => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/question`,
    const response = await fetch(`http://localhost:3001/question`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ question }),
    })
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)

export const $questionData = createStore('').on(
  loadQuestions.doneData,
  (_store, question) => question.question
)

forward({
  from: changeQuestion,
  to: $questionData,
})

sample({
  clock: saveQuestion,
  source: $questionData,
  target: submitQuestion,
  fn: (store, interviewId) => ({ question: store, interviewId }),
})

export const $isSubmitingQuestion = submitQuestion.pending
export const $isLoadingQuestion = loadQuestions.pending
