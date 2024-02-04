'use client'

import React from 'react'
import { Workspace } from "@/src/types/Workspace";
import { Get } from '@/src/ApiClient';
import { AxiosResponse } from 'axios';
import { useParams } from "next/navigation";
import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

export default function Page() {
    const { id } = useParams();
    const [workspace, setWorkspace] = React.useState(undefined as Workspace | undefined)

    React.useEffect(() => {
        Get(`/namespace/${id}`).then((response: AxiosResponse) => {
            const data = response.data as Workspace
            setWorkspace(data);
        });
    }, [id]);

    return <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item cursor-pointer">
                    <Link href='/'>
                        Home
                    </Link>
                </li>
            </ol>
        </nav>
        {workspace && <div className='d-flex w-100'>
            <div>
                <h1 className={`mb-2 text-3xl font-semibold`}>
                    {workspace.title}
                </h1>
                <p className={`m-0 text-sm opacity-50`}>
                    {workspace.description}
                </p>
            </div>
            <div className='ms-auto'>
                {/* <Stack direction="horizontal" gap={2}>
                    <Button as="a" variant="danger">
                        Delete
                    </Button>
                </Stack> */}
            </div>
        </div>}
    </div>;
}
