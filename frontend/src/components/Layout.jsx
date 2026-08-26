import Navbar from "./Navbar.jsx"
import SideBar from "./Sidebar.jsx"

const Layout = ({children, showSidebar=false}) => {
  return (
    <div className='h-screen overflow-hidden'>
        <div className="flex">
            {showSidebar && <SideBar/>}

            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 min-h-0 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    </div>
  )
}

export default Layout