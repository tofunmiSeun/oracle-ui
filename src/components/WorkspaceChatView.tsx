import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { ChatMessage } from "@/src/types/ChatMessage";
import { Get, Post } from '@/src/ApiClient';
import { AxiosResponse } from 'axios';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { Send } from 'react-bootstrap-icons';
import ChatBubble from './ChatBubble';

type Props = {
    show: boolean
    workspace: Workspace
    handleClose: () => void
}

export default function WorkspaceChatView(props: Props) {
    const { show, handleClose, workspace } = props;
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

    return <Offcanvas show={show} placement='end' onHide={handleClose}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='p-2'>
            <div className='d-flex h-100 flex-column'>
                <div className='overflow-scroll mt-auto d-flex flex-column-reverse pe-3'>
                    {chatMessages.map((c) => (
                        <ChatBubble key={c.id} chatMessage={c} />
                    ))}
                </div>
                <div className='mt-0'>
                    <hr />
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
        </Offcanvas.Body>
    </Offcanvas>;
}
