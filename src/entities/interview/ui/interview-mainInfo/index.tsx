import clsx from 'clsx'

import classes from './index.module.css'
import { IMainInfoData, IPositionLevel } from '../../model'
import Loader from '../../../Loader'

type IInterviewMainInfoProps = {
  loading: boolean
  mainInfoData: IMainInfoData
  changeMainInfoData: (data: IMainInfoData) => void
  saveMainInfoChanging: (data: IMainInfoData) => void
}
export const InterviewMainInfo = ({
  loading,
  mainInfoData,
  changeMainInfoData,
  saveMainInfoChanging,
}: IInterviewMainInfoProps): JSX.Element => {
  return (
    <div>
      <h2>Основная информация о собеседовании</h2>
      <table className={clsx('UIKit_table', classes.mainInfoTable)}>
        <tbody>
          <tr>
            <td className={classes.mainInfoTable__headerTd}>Кандидат</td>
            <td>
              <input
                placeholder="например, Сергей Иванов"
                value={mainInfoData.fio}
                onChange={(e) =>
                  changeMainInfoData({
                    ...mainInfoData,
                    fio: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className={classes.mainInfoTable__headerTd}>Интервьюер</td>
            <td>
              <input
                placeholder="@ упомяните интервьюера"
                value={mainInfoData.interviewer}
                onChange={(e) =>
                  changeMainInfoData({
                    ...mainInfoData,
                    interviewer: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className={classes.mainInfoTable__headerTd}>
              Специалист отдела кадров
            </td>
            <td>
              <input
                placeholder="@ упомяните специалиста отдела кадров"
                value={mainInfoData.hr_user}
                onChange={(e) =>
                  changeMainInfoData({
                    ...mainInfoData,
                    hr_user: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className={classes.mainInfoTable__headerTd}>
              Название должности
            </td>
            <td>
              <input
                placeholder="например, программист"
                value={mainInfoData.positionName}
                onChange={(e) =>
                  changeMainInfoData({
                    ...mainInfoData,
                    positionName: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td className={classes.mainInfoTable__headerTd}>
              Уровень должности
            </td>
            <td>
              <select
                value={mainInfoData.positionLevel}
                onChange={(e) =>
                  changeMainInfoData({
                    ...mainInfoData,
                    positionLevel: e.target.value as IPositionLevel,
                  })
                }
              >
                <option value="trainee">trainee</option>
                <option value="junior">junior</option>
                <option value="pre-middle">pre-middle</option>
                <option value="middle">middle</option>
                <option value="pre-senior">pre-senior</option>
                <option value="senior">senior</option>
              </select>
            </td>
          </tr>
          <tr>
            <td className={classes.mainInfoTable__headerTd}>Рекомендация</td>
            <td className={classes.mainInfoTable__labelBlock}>
              <label
                className={clsx(
                  classes.mainInfoTable__labelItem,
                  classes.mainInfoTable__hireLabel
                )}
              >
                <input
                  type="radio"
                  value="hire"
                  name="hireBlock"
                  checked={mainInfoData.hireStatus === 'hire'}
                  onChange={() =>
                    changeMainInfoData({
                      ...mainInfoData,
                      hireStatus: 'hire',
                    })
                  }
                />
                нанимать
              </label>
              <label
                className={clsx(
                  classes.mainInfoTable__labelItem,
                  classes.mainInfoTable__refuseLabel
                )}
              >
                <input
                  type="radio"
                  value="refuse"
                  name="hireBlock"
                  checked={mainInfoData.hireStatus === 'refuse'}
                  onChange={() =>
                    changeMainInfoData({
                      ...mainInfoData,
                      hireStatus: 'refuse',
                    })
                  }
                />
                не нанимать
              </label>
            </td>
          </tr>
          <tr>
            <td className={classes.mainInfoTable__headerTd}>
              Общее обоснование
            </td>
            <td>
              <textarea
                value={mainInfoData.justification}
                onChange={(e) =>
                  changeMainInfoData({
                    ...mainInfoData,
                    justification: e.target.value,
                  })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className={classes.buttonSaveChanging}
        onClick={() => saveMainInfoChanging(mainInfoData)}
      >
        Сохранить
      </button>
      {loading && <Loader />}
    </div>
  )
}
