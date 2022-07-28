import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { UiStateType } from '../../redux/features/ui/ui.types'
import { uiActions, uiSelector } from '../../redux/features/ui'
// styles
import styles from '../../styles/components/layout/ui.module.css'
import { getModuleStylesMethod } from '../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


// Render Notification
const Notification: React.FC<{
  notification: UiStateType['Notifications'][0],
  isLast?: boolean
}> = ({notification, isLast}) => {
  // states
  const { push } = useRouter()
  // -- redirect if <notification.redirect> exists
  useEffect(() => {
    if (notification.redirect) 
      push(notification.redirect.uri, null, {shallow: notification.redirect.shallow})
  }, [])

  return (
    <div className={getStyles(`notification ${notification.status ? "good-msg" : "bad-msg"}`)}>
      <span>
        {notification.msg}
      </span>
    </div>
  )
}


const UINotifications: FC = () => {
  // States
  const dispatch = useAppDispatch()
  const { Notifications, ui_counter }  = useAppSelector(uiSelector)

  // Clear last feedback
  useEffect(() => {
    if (ui_counter)
      setTimeout(() => dispatch(uiActions.popFeedback()), 4000)
  }, [Notifications])

  return (
    <div className={styles["UiNotifications"]}>
      {/* render first 3 notifications */}
      {Notifications.map(notification => 
        <Notification key={notification.id} notification={notification} />)}
    </div>
  )
}

export default UINotifications
