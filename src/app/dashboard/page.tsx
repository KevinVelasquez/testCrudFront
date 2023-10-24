'use client'
import { IHttpRes } from "@/interfaces/http-res.interface";
import { IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import { useEffect, useState } from "react"

async function getUsers() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('a')}`

        },
    };
    const res = await fetch('http://localhost:3000/api/users', requestOptions)


    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function Dashboard() {
    const [users, setUsers] = useState([] as IUser[]);

    useEffect(() => {
        getUsers().then((res: IHttpRes<IUser[]>) => {
            console.log(res)
            setUsers(res.data)
        }).catch((err) => {
            throw new Error(err);
        });

        return () => {

        };
    }, []);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between ">
            <header>
                <h1>Usuarios</h1>
            </header>
            <ul role="list" className="divide-y divide-gray-100">
                {users.map((user) => (
                    <li key={user.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <Image className="h-12 w-12 flex-none rounded-full bg-gray-50" src="/avatar.png" width={48} height={48} alt="" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{user.mobilePhone}</p>
                            {/* {user. ? (
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    Last seen <time dateTime={user.lastSeenDateTime}>{user.lastSeen}</time>
                                </p>
                            ) : (
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">Online</p>
                                </div>
                            )} */}
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    )
}