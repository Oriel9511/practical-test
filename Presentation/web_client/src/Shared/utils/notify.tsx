import DOMPurify from 'dompurify';
import {OverridableStringUnion} from "@mui/types";
import {AlertColor, AlertPropsColorOverrides} from '@mui/material';
import { createRoot } from 'react-dom/client';
import {Notification} from "../components/Notification.tsx";

/**
 * This function creates a notification on the webpage.
 *
 * @param {Object} options - The options for the notification.
 * @param {string} options.color - The color of the notification. Defaults to 'info'.
 * @param {string|React.ReactNode} options.message - The message to be displayed in the notification. Can be a string or HTML content.
 * @param {number} options.duration - The duration for which the notification should be displayed, in milliseconds. Defaults to 5000.
 *
 * @example
 * // Creates a notification with color 'info', message 'Hello, World!', and duration 5000ms.
 * notify({color: 'info', message: 'Hello, World!', duration: 5000});
 *
 * // Creates a notification with HTML content
 * notify({color: 'success', message: '<div><strong>Success!</strong> Operation completed.</div>', duration: 3000});
 */

export function notify({
                           color = 'info',
                           message,
                           duration = 5000,
                           showAcceptButton = false,
                           onAccept,
                       }: {
    color?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
    message: string;
    duration?: number;
    showAcceptButton?: boolean;
    onAccept?: () => void;
}) {
    const sanitizedMessage = DOMPurify.sanitize(message, {
        ALLOWED_TAGS: [
            'b',
            'i',
            'em',
            'strong',
            'a',
            'p',
            'span',
            'div',
            'br',
            'ul',
            'ol',
            'li',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
        ],
        ALLOWED_ATTR: ['href', 'style'],
    });

    const div = document.createElement('div');
    div.id = 'notification-container';
    document.body.appendChild(div);

    const root = createRoot(div);
    root.render(
        <Notification
            color={color}
            message={sanitizedMessage}
            duration={duration}
            onAccept={onAccept}
            showAcceptButton={showAcceptButton}
        />
    );
}
// notify({color: 'primary', message: 'Notification!'});
// notify({color: 'success', message: <div><strong>Success!</strong> Operation completed.</div>});
