import React, { useEffect } from 'react';
import {Alert, AlertColor, AlertPropsColorOverrides, AlertTitle, Button} from '@mui/material';

import {OverridableStringUnion} from "@mui/types";

const titleMap = new Map([
  ['warning', 'Warning'],
  ['error', 'Error'],
  ['success', 'Success'],
  ['info', 'Info'],
  ['primary', 'Info'],
  ['secondary', 'Info'],
  ['inherit', 'Info'],
]);

export const Notification = ({
  color,
  message,
  duration,
  showAcceptButton,
  onAccept,
}: {
  color: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  message: string;
  duration: number;
  showAcceptButton: boolean;
  onAccept?: (event: React.SyntheticEvent) => void;
}) => {
  const closeNotification = async () => {
    const container = document.getElementById('notification-container');
    if (container) {
      container.parentNode?.removeChild(container);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      await closeNotification();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="notification"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '0',
        zIndex: 20,
        width: '800px',
    }}
    >
      <Alert severity={color} onClose={async () => await closeNotification()}>
        <AlertTitle>{titleMap.get(color)}</AlertTitle>
        <div dangerouslySetInnerHTML={{ __html: message }} />
        {showAcceptButton && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem', marginRight: '0.5rem' }}>
            <Button
              variant={'text'}
              color={color}
              size={'small'}
              onClick={(event) => {
                if(onAccept) onAccept(event);
                closeNotification();
              }}
            >
              Accept
            </Button>
          </div>
        )}
      </Alert>
    </div>
  );
};
