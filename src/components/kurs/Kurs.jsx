import axios from 'axios';
import React from 'react'
import { useParams, NavLink } from "react-router-dom"
import Gruppalar from '../gruppalar/Gruppalar';
import "./kurs.scss"
import { DoubleRightOutlined } from "@ant-design/icons"
import SkeletonLoading from '../skleton/SkletonLoading';

const Kurs = () => {
    const { id } = useParams()

    const [kurs, setKurs] = React.useState([])
    const [fakul, setFakul] = React.useState([])
    const [loding, setLodnig] = React.useState(false)

    const getKurs = async (id) => {
        try {
            const { data } = await axios.get(`https://schedule.allpro.uz/api/faculty:${id}/courses`)
            setLodnig(true)
            if (data.code === 200) {
                setKurs(data.courses.data)
                setFakul(data.courses.faculty)
                setLodnig(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        if (id) {
            getKurs(id);
        }

        return () => {
            setKurs([])
        }
    }, [id])

    return (
        <div className='kurs_inner con'>
            <div className='fak-inners fak-info'>
                <NavLink className="fak-tits" to='/'>
                    <i class="fa fa-home mx-3"></i>
                    BOSH SAHIFA
                </NavLink>
                <DoubleRightOutlined className='icon-lef' />
                <div className='fak-name'> {fakul.name} </div>
            </div>
            {
                kurs.length > 0 ?
                    (kurs.map((item) => (
                        <div className='fak-inner card  shadow-sm border' key={item.id}>
                            <NavLink className='card-body fak-tit' to={`/faculty${id}/curses${item.id}/grup`}>
                                {item.name}
                            </NavLink>
                        </div>
                    ))
                    ) : (
                        <SkeletonLoading />
                    )
            }


        </div>
    )
}

export default Kurs