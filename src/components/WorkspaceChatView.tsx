import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import Offcanvas from 'react-bootstrap/Offcanvas';

type Props = {
    show: boolean
    workspace: Workspace
    handleClose: () => void
}

export default function WorkspaceChatView(props: Props) {
    const { show, handleClose, workspace } = props;

    return <Offcanvas show={show} placement='end' onHide={handleClose}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Ask me a question</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
    </Offcanvas>;
}
