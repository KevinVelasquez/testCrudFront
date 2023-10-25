'use client'
import { IHttpRes } from "@/interfaces/http-res.interface";
import { IUser } from "@/interfaces/user.interface";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

async function getUsers() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('a')}`

        },
    };
    const res = await fetch('http://localhost:3001/api/users', requestOptions)


    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function Dashboard() {
    const [users, setUsers] = useState([] as IUser[]);
    const router = useRouter();
    const searchParams = useSearchParams();


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

    const onUserDetail = (id: number) => {
        const callbackUrl = searchParams.get("callbackUrl") || `/dashboard/${id}`;

        router.push(callbackUrl);
    }


    return (
        <main className="flex min-h-screen flex-col items-center">
            <nav className="flex justify-between bg-gray-800 w-full p-12">
                <h1 className="text-white font-mono font-bold text-2xl">Usuarios</h1>
                <a href="./dashboard/create" className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Crear Usuario</a>
            </nav>
            <ul role="list" className="divide-y divide-gray-100 w-full p-12">
                {users.map((user) => (
                    <li key={user.id} onClick={() => onUserDetail(user.id)} className="flex justify-between gap-x-6 py-5 hover:bg-gray-100 p-3 cursor-pointer">
                        <div className="flex min-w-0 gap-x-4">
                            <Image className="h-12 w-12 flex-none rounded-full bg-gray-50" src="/avatar.png" width={48} height={48} alt="" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{user.mobilePhone}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    )
}