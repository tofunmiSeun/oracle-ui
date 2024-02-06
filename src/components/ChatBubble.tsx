import React from 'react'
import { ChatMessage } from "@/src/types/ChatMessage";
import { PersonCircle, Robot } from 'react-bootstrap-icons';

type Props = {
    chatMessage: ChatMessage
}

export default function ChatBubble(props: Props) {
    const { chatMessage } = props;
    const isAIChatMessage = React.useMemo(() => chatMessage.sender === 'AI', [chatMessage]);

    const chatBubbleContainerClassName = React.useMemo((): string => {
        let result = 'w-75 d-flex flex-column mb-3';

        if (isAIChatMessage) result += ' me-auto '
        else result += ' ms-auto ';

        return result;
    }, [isAIChatMessage]);

    const chatBubbleAvatarClassName = React.useMemo((): string => {
        let result = 'm-2';

        if (isAIChatMessage) {
            result += ' align-self-start'
        } else {
            result += ' align-self-end';
        }

        return result;
    }, [isAIChatMessage]);

    const chatBubbleInnerClassName = React.useMemo((): string => {
        let result = 'rounded rounded-3 p-3';

        if (isAIChatMessage) {
            result += ' bg-secondary '
        } else {
            result += ' bg-primary';
        }

        return result;
    }, [isAIChatMessage]);

    return <div key={chatMessage.id}
        className={chatBubbleContainerClassName}>
        <div className={chatBubbleAvatarClassName}>
            {isAIChatMessage && <Robot />}
            {!isAIChatMessage && <PersonCircle />}
        </div>
        <div className={chatBubbleInnerClassName}>
            <p className='mb-0 text-right'>
                {chatMessage.message}
            </p>
        </div>
    </div>
}