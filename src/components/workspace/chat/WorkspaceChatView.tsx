import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { ChatMessage } from "@/src/types/ChatMessage";
import { Get, Post } from '@/src/ApiClient';
import { AxiosResponse } from 'axios';
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
    const [chatMessages, setChatMessages] = React.useState(Array<ChatMessage>());
    const [chatText, setChatText] = React.useState('');

    const isSubmitButtonDisabled = React.useMemo(() => {
        return chatText.trim().length < 5;
    }, [chatText])

    const fetchChatMessages = React.useCallback(() => {
        Get(`/chat-messages/${workspace.id}`).then((response: AxiosResponse) => {
            const data = response.data as Array<ChatMessage>
            setChatMessages(data);
        });
    }, [workspace])

    const askAI = React.useCallback((e?: any) => {
        e?.preventDefault();
        Post(`/chat-messages/ask-ai/${workspace.id}`, { query: chatText }).then(() => {
            setChatText('');
            fetchChatMessages();
        });
    }, [workspace, chatText, fetchChatMessages])

    React.useEffect(() => fetchChatMessages(), [fetchChatMessages]);

    return <div>
        <div className='overflow-scroll p-3' style={{ height: 'calc(100vh - 120px)' }}>
            <div className='d-flex flex-column-reverse'>
                {chatMessages.map((c) => (
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
