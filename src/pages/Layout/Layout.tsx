import { Outlet } from "react-router-dom"
import Header from "../../features/components/Header/Header"

const Layout = () => {
    return (
        <>

            <main>
                <Header />
                <Outlet />
            </main>

        </>
    )
}

export default Layout