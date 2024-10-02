import {Header} from "./Shared/components/Header.tsx";

export function Layout({children, ...props}:{children: React.ReactNode} & React.HTMLProps<HTMLDivElement>) {
    return (
        <div {...props}>
            <Header />
            {children}
        </div>
    );
}
