import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from 'effector'

export const loadCandidateInfo = createEvent<string | undefined>()
export const changeCandidateInfo = createEvent<string>()
export const saveCandidateChanging = createEvent<{
  files: FileList | null | undefined
  interviewId: string | undefined
}>()

const loadCandidateInfoFx = createEffect(
  async (interviewId: string | undefined) => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/candidateInfo`)
    const response = await fetch(`http://localhost:3001/candidateInfo`)
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)
const submitingForm = createEffect(
  async (data: {
    candidateInfo: string
    files: FileList | null | undefined
    interviewId: string | undefined
  }) => {
    const formData = new FormData()

    formData.append('candidateInfo', data.candidateInfo)
    if (data.files) {
      formData.append('files', data.files[0])
    }

    // const response = await fetch(`http://localhost:3001/interviews/${data.interviewId}/candidateInfo`,
    const response = await fetch(`http://localhost:3001/candidateInfo`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ candidateInfo: data.candidateInfo }),
    })
    const result = await response.json()
    return result
  }
)

export const $candidateInfoData = createStore('')

forward({
  from: changeCandidateInfo,
  to: $candidateInfoData,
})

sample({ clock: loadCandidateInfo, target: loadCandidateInfoFx })
sample({
  clock: loadCandidateInfoFx.doneData,
  fn: (candidateInfo) => candidateInfo.candidateInfo,
  target: $candidateInfoData,
})

sample({
  clock: saveCandidateChanging,
  source: $candidateInfoData,
  fn: (candidateInfo, { files, interviewId }) => ({
    candidateInfo,
    files,
    interviewId,
  }),
  target: submitingForm,
})

export const $isSubmitingCandidateInfo = submitingForm.pending
export const $isLoadingCandidateInfo = loadCandidateInfoFx.pending
