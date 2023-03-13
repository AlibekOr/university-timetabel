import React from 'react'
import { NavLink } from "react-router-dom"
import Logo from "../../logo/karsu.png"
import { Input, Button } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import axios from 'axios'

import "./header.scss"


const Header = () => {
    const [serach, setSerach] = React.useState()
    const [searchData, setSearchData] = React.useState([])
    const { Search } = Input;
    const onSearch = (value) => {
        if (value.length > 3) {
            return setSerach(value)
        }
        else {
            setSerach()
        }

    };

    const handelSearchshet = () => {
        setSearchData([])
    }
    const suffix = (
        <SearchOutlined
            style={{
                padding: 2,
                fontSize: 20,
                color: '#f8f9fa',

            }}
        />

    );

    const getSearche = async () => {
        try {
            const { data } = await axios(`https://schedule.allpro.uz/api/search:${serach}`)
            if (data.code === 200) {
                setSearchData(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }


    React.useEffect(() => {
        if (serach) {
            getSearche(serach)
        }
    }, [serach])

    return (
        <>
            <div className='header-body '>
                <div className="header-right  navbar navbar-expand-lg container-fluid">
                    <NavLink href="/">
                        <img className='logoImg' src={Logo} alt="foto" />
                    </NavLink>
                    <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse nav-bl  navbar-collapse'>
                        <div className='nav-bl-inner'>
                            <NavLink className="header-title" to="/">
                                BOSH SAHIFA
                            </NavLink>

                        </div>

                        <Search
                            placeholder="O‘qituvchi F.I.Sh."
                            allowClear
                            className='serch-form'
                            enterButton={suffix}
                            style={{
                                width: 280,
                                height: 50,
                                textTransform: "uppercase"
                            }}
                            size="large"
                            onSearch={onSearch}
                        />


                    </div>
                </div>
                <div className="header-left" id='search_items'>
                    {
                        searchData.map((item) => (
                            <h2 key={item.employee.id} className='search__Ti'>
                                <div className='employee'>
                                    <i class="fas fa-user-tie"></i>
                                    <NavLink to={`timetable_${item.employee.id}/get`}
                                        className="font-weight-bold searchRez"
                                        dangerouslySetInnerHTML={{ __html: item.employee.name }}
                                        onClick={handelSearchshet}
                                    ></NavLink>
                                </div>
                                <div className='departament'>
                                    {item.department.name}
                                </div>
                            </h2>
                        ))

                    }
                </div>
            </div>

        </>
    )
}

export default Header