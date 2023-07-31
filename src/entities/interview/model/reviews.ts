import { createEffect, createEvent, createStore, sample } from 'effector'

export type IReview = {
  id: number
  skill: string
  evaluationSection: string
  grade: string
  description: string
}

export const loadReviews = createEvent<string | undefined>()

const loadReviewsFx = createEffect(
  async (interviewId: string | undefined): Promise<IReview[]> => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/reviews`)
    const response = await fetch(`http://localhost:3001/reviews`)
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)
export const createNewReviewFx = createEffect(
  async ({
    data,
    interviewId,
  }: {
    data: Omit<IReview, 'id'>
    interviewId: string | undefined
  }): Promise<IReview> => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/reviews`,
    const response = await fetch(`http://localhost:3001/reviews`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ ...data, id: Math.random() * 100 }),
    })
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)
export const editReviewFx = createEffect(
  async ({
    data,
    interviewId,
  }: {
    data: IReview
    interviewId: string | undefined
  }): Promise<IReview> => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/reviews/${data.id}`,
    const response = await fetch(`http://localhost:3001/reviews/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)

export const $reviewsData = createStore<IReview[]>([])

sample({
  clock: loadReviews,
  target: loadReviewsFx,
})
sample({
  clock: loadReviewsFx.doneData,
  target: $reviewsData,
})

sample({
  clock: createNewReviewFx.doneData,
  source: $reviewsData,
  fn: (store, newReview) => [...store, newReview],
  target: $reviewsData,
})
sample({
  clock: editReviewFx.doneData,
  source: $reviewsData,
  fn: (store, editReview) =>
    store.map((review) => (review.id === editReview.id ? editReview : review)),
  target: $reviewsData,
})

export const $isLoadingReviews = loadReviewsFx.pending
export const $isCreatingNewReview = createNewReviewFx.pending
export const $isEditingReview = editReviewFx.pending
