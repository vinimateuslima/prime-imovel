import { Outlet } from "react-router-dom"
import Header from "../../features/components/Header/Header"
import Footer from "../../features/components/Footer/Footer"


const Layout = () => {
    return (
        <>

            <main>
                <Header />
                <Outlet />
                <Footer/>
            </main>

        </>
    )
}

export default Layout