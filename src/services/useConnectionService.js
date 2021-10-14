import React, { useCallback, useEffect, useState } from 'react';
import { withToastManager } from 'react-toast-notifications';

const useConnectionService = ({ toastManager }) => {
  const [offlineToastId, setOfflineToastId] = useState(null)

  const onlineCallback = useCallback(() => {
    if (offlineToastId) {
      toastManager.remove(offlineToastId);
      setOfflineToastId(null)
    }
  }, [toastManager, offlineToastId])

  const offlineCallback = useCallback((id) => {
    setOfflineToastId(id)
  }, [])

  useEffect(() => {
    const connectionListener = () => {
      const newIsOnline = window.navigator.onLine

      toastManager.add((
        <div>
          <strong>{newIsOnline ? 'Online' : "Offline"}</strong>
          <div>
            {newIsOnline
              ? 'You are online again, back to work!'
              : 'Your connection seems to be out, changes you make may not take place.'}
          </div>
        </div>
      ), {
        appearance: newIsOnline ? 'info':'warning',
        autoDismiss: newIsOnline,
      }, newIsOnline
        ? onlineCallback
        : offlineCallback);
    }

    window.addEventListener('online', connectionListener)
    window.addEventListener('offline', connectionListener);
    return () => {
      window.removeEventListener('online', connectionListener)
      window.removeEventListener('offline', connectionListener)
    }
  }, [toastManager, onlineCallback, offlineCallback]);

  return null
}

export default withToastManager(useConnectionService);