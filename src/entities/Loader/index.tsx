import classes from './index.module.css'

export default function Loader(): JSX.Element {
  return (
    <div className={classes.loader}>
      <div className={classes.loader__roller}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
