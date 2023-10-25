'use client'
import { IHttpRes } from "@/interfaces/http-res.interface";
import { IUser } from "@/interfaces/user.interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
async function getUser(id: number) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('a')}`

        },
    };
    const res = await fetch(`http://localhost:3001/api/users/${id} `, requestOptions)



    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function UserDetail({ params }: {
    params: { id: string }
}) {
    const [user, setUser] = useState({} as IUser);
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        getUser(+params.id).then((res: IHttpRes<IUser>) => {
            console.log(res)
            setUser(res.data)
        }).catch((err) => {
            throw new Error(err);
        });

        return () => {

        };
    }, [params.id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/users/${params.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                console.log('Registrado con éxito');
                router.push(callbackUrl);
            }
        } catch (error: any) {
            console.log('Error al crear el Usuario');
        }
    };

    const handleDelete = async (e: React.FormEvent) => {
        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
        e.preventDefault();
        const isDeleted = window.confirm('¿seguro que quieres eliminar?')
        if (isDeleted) {

            try {
                const response = await fetch(`http://localhost:3001/api/users/${params.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });
                if (response.ok) {
                    console.log('Registrado con éxito');
                    router.push(callbackUrl);
                }
            } catch (error: any) {
                console.log('Error al crear el Usuario');
            }
        }
    };
    return (
        <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Actualizar Usuario</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="lastname">Apellido:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="mobilePhone">Teléfono:</label>
                        <input
                            type="text"
                            id="mobilePhone"
                            name="mobilePhone"
                            value={user.mobilePhone}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div className='flex justify-between gap-2'>
                        <button onClick={router.back} className="w-6/12 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Volver</button>

                        <button type="submit" className="w-6/12 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
                    </div>
                    <button onClick={handleDelete} className="w-full flex justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Borrar</button>
                </form>
            </div>
        </main>
    )
}
