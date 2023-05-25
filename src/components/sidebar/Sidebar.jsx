import React, { useState } from 'react'
import {
    Sidebar as Sidenav, Menu, MenuItem, SubMenu
} from 'react-pro-sidebar';
import './sidebar.css'
import { BiArrowBack } from 'react-icons/bi';
import { FaListAlt } from 'react-icons/fa';
import { IoMdArrowForward, IoMdSchool } from 'react-icons/io';
import { AiFillHome,AiOutlineArrowUp } from 'react-icons/ai';
import { Link } from 'react-router-dom';


function Sidebar() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const [collapsed, setCollapsed] = useState(isMobile)
    const handleCollapse = () => {
        setCollapsed(!collapsed);
    }

    return (
        <Sidenav
            className='p-0 sidebar '
            collapsed={collapsed}
        >
            {
                !collapsed && <Link to='/'><img src='https://upload.wikimedia.org/wikipedia/tr/thumb/c/c6/Samsun_%C3%9Cniversitesi_logo.png/200px-Samsun_%C3%9Cniversitesi_logo.png' className='sidebar-img' /></Link>
            }
            <Menu >
                {collapsed ? (
                    <MenuItem
                        icon={<IoMdSchool className='sidebar-icon' />}
                        onClick={handleCollapse}
                        className='d-none d-sm-block'
                    ></MenuItem>
                ) : (
                    <MenuItem
                        onClick={handleCollapse}
                    >
                        <div
                            style={{
                                padding: '9px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 15,
                                letterSpacing: '1px'
                            }}
                        >
                            MUDEK
                        </div>
                    </MenuItem>
                )}
            </Menu>
            <Menu>
                <MenuItem
                    icon={<AiFillHome className='sidebar-icon' />}
                    active={window.location.pathname === "/"}
                    component={<Link to="/" />}
                >
                    Ana Sayfa
                </MenuItem>
                <SubMenu
                    defaultOpen={window.location.pathname === "/test"}
                    label="İşlemler"
                    title={'İşlemler'}
                    icon={<FaListAlt className='sidebar-icon' />}
                    active={window.location.pathname === "/test"}
                >
                    <MenuItem
                        active={window.location.pathname === "/test"}
                        component={<Link to="/test" />}
                    >
                        1
                    </MenuItem>
                    <MenuItem
                        active={window.location.pathname === "/2"}
                        component={<Link to="/2" />}
                    >
                        2
                    </MenuItem>
                </SubMenu>
            </Menu>
            {
                collapsed ? <IoMdArrowForward className='back-button d-none d-sm-block' onClick={handleCollapse} /> : <BiArrowBack className='back-button ' onClick={handleCollapse} />
            }
            {
                isMobile && <AiOutlineArrowUp onClick={()=>window.scrollTo({top:0, behavior: 'smooth'})} className='top-button'>Test</AiOutlineArrowUp>
            } 
        </Sidenav>
    )
}

export default Sidebar