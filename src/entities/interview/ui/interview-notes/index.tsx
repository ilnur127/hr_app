import { useState } from 'react'

import type { INote } from '../../model'

import classes from './notes.module.css'
import Loader from '../../../Loader'

const NoteComponent = ({
  note,
  editNote,
}: {
  note: INote
  editNote: (data: INote) => void
}) => {
  const [question, setQuestion] = useState(note.question)
  const [description, setDescription] = useState(note.description)
  return (
    <tr>
      <td>
        <textarea
          placeholder="Например, опишите последний проект, над которым работали. Какую проблему вы пытались решить и какой путь вы для этого выбрали? С какими сложнастями вы столкнулись в процессе?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className={classes.saveEditingTextArea}
          onClick={() => editNote({ ...note, question })}
        >
          &#10003;
        </button>
      </td>
      <td>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className={classes.saveEditingTextArea}
          onClick={() => editNote({ ...note, description })}
        >
          &#10003;
        </button>
      </td>
    </tr>
  )
}

const AddNoteComponent = ({
  addNewNote,
}: {
  addNewNote: (data: Omit<INote, 'id'>) => void
}) => {
  const [question, setQuestion] = useState('')
  const [description, setDescription] = useState('')
  const [addingMode, setAddingMode] = useState(false)
  return addingMode ? (
    <>
      <div className={classes.addNewNote_row}>
        <div>
          <textarea
            placeholder="Например, опишите последний проект, над которым работали. Какую проблему вы пытались решить и какой путь вы для этого выбрали? С какими сложнастями вы столкнулись в процессе?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.actionRowButton}>
        <button
          onClick={() => {
            addNewNote({ question, description })
            setAddingMode(false)
          }}
        >
          Сохранить
        </button>
        <button
          onClick={() => {
            setQuestion('')
            setDescription('')
            setAddingMode(false)
          }}
        >
          Отменить
        </button>
      </div>
    </>
  ) : (
    <button
      className={classes.addRowButton}
      onClick={() => setAddingMode(true)}
    >
      Добавить
    </button>
  )
}

type IInterviewNotesProps = {
  loading: boolean
  notes: INote[]
  addNewNote: (data: Omit<INote, 'id'>) => void
  editNote: (data: INote) => void
}
export const InterviewNotes = ({
  loading,
  notes,
  addNewNote,
  editNote,
}: IInterviewNotesProps) => {
  return (
    <div>
      <h2>Заметки о собеседовании</h2>
      <small className={classes.smallPrompt}>
        Заранее добавьте вопросы в таблицу ниже, а затем делайте заметки об
        ответах кандидата во время собеседования
      </small>
      <div className="UIKit_table">
        <table className={classes.notesTable}>
          <thead>
            <tr>
              <td>Вопрос</td>
              <td>Примечание</td>
            </tr>
          </thead>
          <tbody>
            {notes && Array.isArray(notes) && notes.length ? (
              notes.map((note) => (
                <NoteComponent key={note.id} note={note} editNote={editNote} />
              ))
            ) : (
              <tr>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
        <AddNoteComponent addNewNote={addNewNote} />
      </div>
      {loading && <Loader />}
    </div>
  )
}
