import { FaChartLine, FaFileAlt, FaPlus, FaPrint, FaTimes, FaUsers } from "react-icons/fa"
import { ROUTES } from "../../consts/routes"
import { Link, useLocation } from "react-router-dom"
import { SidebarItemProps, SidebarProps } from "../../consts/sidebar"
import { ROLE } from "../../consts/role"
import { User } from "../../consts/user";
import { useAuthUser } from "react-auth-kit";



const Sidebar = (props: SidebarProps) => {
    const { sidebarRef, sidebarActive, setSidebarActive } = props
    const userData = useAuthUser()() as User

    return <>

        {sidebarActive && <div className="w-screen h-screen fixed top-0 bg-black bg-opacity-70 left-0"></div>}
        <div ref={sidebarRef}
            className={`fixed h-screen bg-slate-200 floating-shadow-lg left-0 top-0 
            lg:w-[350px] md:w-1/2 w-full
            transition duration-300
            ${!sidebarActive && 'lg:-translate-x-[350px] md:-translate-x-[50vw] -translate-x-full'}
        `}
            style={{ zIndex: '2 !important' }}
        >

            <div className="flex md:justify-center justify-between items-center md:py-6 py-3 px-6 border-b-2 border-primaryDarker bg-primary">
                <img src="/images/logo-without-text.png" width={96} className="md:w-1/3 w-3/12 bg-white rounded-full p-2" alt="" />
                <button className="bg-white md:hidden flex h-12 w-12 items-center justify-center rounded-full text-primary" onClick={() => setSidebarActive(false)}>
                    <FaTimes />
                </button>
            </div>
            {/* Sidebar items */}
            <div className="w-full h-full bg-white flex flex-col">
                <SidebarItem
                    label="Dashboard"
                    Icon={FaChartLine}
                    to={ROUTES.INTERNAL.DASHBOARD}
                />
                <SidebarItem
                    label="Pelaporan"
                    Icon={FaFileAlt}
                    to={ROUTES.INTERNAL.PELAPORAN}
                />
                <SidebarItem
                    label="Buat Pelaporan"
                    Icon={FaPlus}
                    to={ROUTES.INTERNAL.CREATE_LAPORAN}
                />
                {userData.role === ROLE.KELURAHAN && (
                <>
                <SidebarItem
                    label="Tambah Akun Satgas & Admin"
                    Icon={FaUsers}
                    to={ROUTES.INTERNAL.TAMBAH_SATGAS}
                />
                <SidebarItem
                    label="Cetak Rekap Laporan"
                    Icon={FaPrint}
                    to={ROUTES.INTERNAL.CETAK_REKAP}
                />
                </>
                )}
                 
            </div>
        </div>

    </>
}

const SidebarItem = (props: SidebarItemProps) => {
    const { to, Icon, label } = props
    const location = useLocation()
    return <Link
        to={to}
        className={`p-6 text-black flex gap-3 items-center 
            hover:bg-gray-200 transition duration-300 font-bold
                ${location.pathname == to && 'bg-gray-200'}
            `}>
        <span className="text-2xl">
            <Icon />
        </span>
        <span>{label}</span>
    </Link>
}



export default Sidebar