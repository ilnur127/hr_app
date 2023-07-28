import { createEffect, createStore } from 'effector'

export type INote = {
  id: number
  question: string
  description: string
}

export const getNotesEffect = createEffect(
  async (interviewId: string | undefined): Promise<INote[]> => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/notes`)
    const response = await fetch(`http://localhost:3001/notes`)
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)
export const createNewNoteEffect = createEffect(
  async ({
    data,
    interviewId,
  }: {
    data: Omit<INote, 'id'>
    interviewId: string | undefined
  }): Promise<INote> => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/notes`,
    const response = await fetch(`http://localhost:3001/notes`, {
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
export const editNoteEffect = createEffect(
  async ({
    data,
    interviewId,
  }: {
    data: INote
    interviewId: string | undefined
  }) => {
    const response = await fetch(`http://localhost:3001/notes/${data.id}`, {
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

export const $notesData = createStore<INote[]>([])
  .on(getNotesEffect.doneData, (_store, reviews) => reviews)
  .on(createNewNoteEffect.doneData, (store, newNote) => [...store, newNote])
  .on(editNoteEffect.doneData, (store, editNote) =>
    store.map((note) => (note.id === editNote.id ? editNote : note))
  )

export const $isLoadingNotes = getNotesEffect.pending
export const $isCreatingNewNote = createNewNoteEffect.pending
export const $isEditingNote = editNoteEffect.pending
