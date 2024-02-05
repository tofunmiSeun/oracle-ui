import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { useRouter } from "next/navigation";

type Props = {
    workspace: Workspace
}

export default function WorkspaceCardView(props: Props) {
    const router = useRouter();
    const workspace = props.workspace;

    const viewWorkspace = () => {
        router.push(`/workspace/${workspace.id}`);
    };

    return (
        <div key={workspace.id} className="col-lg-4 cursor-pointer" onClick={viewWorkspace}>
            <div className='border border-1 border-secondary 
            rounded rounded-1 p-4 cursor-pointer'>
                <p className="h3 mb-2">{workspace.title}</p>
                <p className={`m-0 text-sm opacity-50`}
                    style={{ maxWidth: 300, height: '3em' }}>
                    {workspace.description}
                </p>
            </div>
        </div>
    );
}
