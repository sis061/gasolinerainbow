import type { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <main className='transition-all duration-200 ease-in-out'>
            {children}
        </main>
    )
}