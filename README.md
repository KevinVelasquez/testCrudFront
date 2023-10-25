This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Como empezar

Primero, instalación de dependencias:

```bash
npm install
```

Segundo, correr el entorno de desarrollo local:

```bash
npm run dev
```

## Como ejecutar con Docker
```bash
docker build -t my-express-app .
docker run -p 3001:3001 my-express-app
```

Abrir [http://localhost:3000/login](http://localhost:3000/login) con tu navegador para visualizar la aplicación
## Como ejecutar con Docker

## Composición de la aplicación

La aplicación consta de dos módulos principales, los cuales son el Login `app/login/page.tsx` y el dashboard `app/dashboard/page.tsx` el cual contiene el listado de usuarios, la vista de creación de usuario `app/dashboard/create/page.tsx` y la vista de detalle de usuario `app/dashboard/[id]/page.tsx`, en la cual se puede editar y eliminar el usuario
