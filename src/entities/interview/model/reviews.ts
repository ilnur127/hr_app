import { createEffect, createStore } from 'effector'

export type IReview = {
  id: number
  skill: string
  evaluationSection: string
  grade: string
  description: string
}

export const getReviewsEffect = createEffect(
  async (interviewId: string | undefined): Promise<IReview[]> => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/reviews`)
    const response = await fetch(`http://localhost:3001/reviews`)
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)
export const createNewReviewEffect = createEffect(
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
export const editReviewEffect = createEffect(
  async ({
    data,
    interviewId,
  }: {
    data: IReview
    interviewId: string | undefined
  }) => {
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
  .on(getReviewsEffect.doneData, (_store, reviews) => reviews)
  .on(createNewReviewEffect.doneData, (store, newReview) => [
    ...store,
    newReview,
  ])
  .on(editReviewEffect.doneData, (store, editReview) =>
    store.map((review) => (review.id === editReview.id ? editReview : review))
  )

export const $isLoadingReviews = getReviewsEffect.pending
export const $isCreatingNewReview = createNewReviewEffect.pending
export const $isEditingReview = editReviewEffect.pending
