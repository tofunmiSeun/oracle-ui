import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { ChatMessage } from "@/src/types/ChatMessage";
import { useApiClient } from '@/src/ApiClient';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { Send } from 'react-bootstrap-icons';
import ChatBubble from './ChatBubble';

type Props = {
    workspace: Workspace
}

export default function WorkspaceChatView(props: Props) {
    const { workspace } = props;
    const [chatText, setChatText] = React.useState('');

    const fetchChatMessagesApiClient = useApiClient<Array<ChatMessage>>('get', `/chat-messages/${workspace.id}`);
    const { data: chatMessages, dispatch: fetchChatMessages } = fetchChatMessagesApiClient;

    const isSubmitButtonDisabled = React.useMemo(() => {
        return chatText.trim().length < 5;
    }, [chatText]);

    const onChatMessageSent = () => {
        setChatText('');
        fetchChatMessages();
    }
    const { dispatch: sendChatMessage } = useApiClient<void>('post', `/chat-messages/ask-ai/${workspace.id}`, onChatMessageSent);

    const askAI = React.useCallback((e?: any) => {
        e?.preventDefault();
        sendChatMessage({ query: chatText });
    }, [sendChatMessage, chatText])

    React.useEffect(() => fetchChatMessages(), [fetchChatMessages]);

    return <div>
        <div className='overflow-scroll p-3' style={{ height: 'calc(100vh - 120px)' }}>
            <div className='d-flex flex-column-reverse'>
                {chatMessages && chatMessages.map((c) => (
                    <ChatBubble key={c.id} chatMessage={c} />
                ))}
            </div>
        </div>

        <div className='mt-0 p-3'>
            <Stack direction="horizontal" gap={2}>
                <Form.Control
                    placeholder="Ask your question here..."
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)} />
                <Button variant="secondary" disabled={isSubmitButtonDisabled}
                    onClick={askAI}>
                    <Send />
                </Button>
            </Stack>
        </div>
    </div>
}
