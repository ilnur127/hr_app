import { createEffect, createEvent, createStore, sample } from 'effector'

export type INote = {
  id: number
  question: string
  description: string
}

export const loadNotes = createEvent<string | undefined>()

const loadNotesFx = createEffect(
  async (interviewId: string | undefined): Promise<INote[]> => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/notes`)
    const response = await fetch(`http://localhost:3001/notes`)
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)
export const createNewNoteFx = createEffect(
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
export const editNoteFx = createEffect(
  async ({
    data,
    interviewId,
  }: {
    data: INote
    interviewId: string | undefined
  }): Promise<INote> => {
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

sample({ clock: loadNotes, target: loadNotesFx })
sample({ clock: loadNotesFx.doneData, target: $notesData })

sample({
  clock: createNewNoteFx.doneData,
  source: $notesData,
  fn: (store: INote[], newNote: INote) => [...store, newNote],
  target: $notesData,
})
sample({
  clock: editNoteFx.doneData,
  source: $notesData,
  fn: (store: INote[], editNote: INote) =>
    store.map((note) => (note.id === editNote.id ? editNote : note)),
  target: $notesData,
})

export const $isLoadingNotes = loadNotesFx.pending
export const $isCreatingNewNote = createNewNoteFx.pending
export const $isEditingNote = editNoteFx.pending
