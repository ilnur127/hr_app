import {
  createEvent,
  createStore,
  sample,
  createEffect,
  forward,
} from 'effector'

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

export const changeMainInfoData = createEvent<IMainInfoData>()
export const saveMainInfoChanging = createEvent<string | undefined>()

const submitingForm = createEffect(
  async ({
    interviewId,
    data,
  }: {
    interviewId: string | undefined
    data: IMainInfoData
  }): Promise<IMainInfoData> => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/mainInfo`,
    const response = await fetch(`http://localhost:3001/mainInfo`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.log(interviewId)
    const result = await response.json()
    return result
  }
)
export const loadMainInfo = createEffect(
  async (interviewId: string | undefined): Promise<IMainInfoData> => {
    // const response = await fetch(`http://localhost:3001/interviews/${interviewId}/mainInfo`)
    const response = await fetch(`http://localhost:3001/mainInfo`)
    const result = await response.json()
    console.log(interviewId)
    return result
  }
)
export const $mainInfoData = createStore<IMainInfoData>({
  fio: '',
  interviewer: '',
  hr_user: '',
  positionName: '',
  positionLevel: '',
  hireStatus: '',
  justification: '',
}).on(loadMainInfo.doneData, (_store, mainInfo) => mainInfo)

forward({
  from: changeMainInfoData,
  to: $mainInfoData,
})

sample({
  clock: saveMainInfoChanging,
  source: $mainInfoData,
  target: submitingForm,
  fn: (store, interviewId) => ({ data: store, interviewId }),
})

export const $isSubmitingMainInfo = submitingForm.pending
export const $isLoadingMainInfo = loadMainInfo.pending
