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


/**
 * @param notification  the notification to render
 * @returns a rendered notification component from a given notification
 */
const Notification: React.FC<{
  notification: UiStateType['Notifications'][0]
}> = ({notification}) => {
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


/**
 * @returns a rendered (dynamic) notifications list - notifications appear and disappear by their order
 */
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