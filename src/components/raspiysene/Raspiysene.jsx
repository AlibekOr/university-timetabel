import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { DoubleRightOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom"
import SkeletonLoading from '../skleton/SkletonLoading'
import BirinshiKun from './birinshiKun/BirinshiKun'
import "./raspiysene.scss"


const Raspiysene = () => {
    const [isLoding, setIsLoding] = useState(false)
    const { id, getid, resID } = useParams()
    const [fakul, setFakul] = React.useState()
    const [curs, setСurs] = React.useState()
    const [grup, setGrup] = React.useState()
    const [timeTable, setTimeTable] = React.useState([])
    const [raspiysene, setRaspiysene] = React.useState([])
    const resGet = async (id, getid, resID) => {
        try {
            const { data } = await axios.get(`https://schedule.allpro.uz/api/faculty:${id}/course:${getid}/group:${resID}/timetable`)
            setIsLoding(true)
            if (data.code === 200) {
                //raspiysene
                setTimeTable(data.code)
                // info 

                setFakul(data.timetable.faculty.name)
                setСurs(data.timetable.course.name)
                setGrup(data.timetable.group.name)
                if (data.timetable.data) {
                    const res = Object.entries(data.timetable.data)
                    setRaspiysene(res)
                }
            }
        } catch (error) {
            console.log(error.message);
            setIsLoding(false)
        }
    }


    React.useEffect(() => {
        if (id, getid, resID) {
            resGet(id, getid, resID)

        }

        return () => {

        }
    }, [resID, id, getid])


    return (
        <>
            <div className='inner-block con'>
                <div className='fak-inners fak-info'>
                    <NavLink className="fak-tits" to='/'>
                        <i class="fa fa-home mx-3"></i>
                        BOSH SAHIFA
                    </NavLink>
                    <DoubleRightOutlined className='icon-lef' />
                    <NavLink className='fak-tits' to={`/faculty${id}/curses`}>{fakul}</NavLink>
                    <DoubleRightOutlined className='icon-lef' />
                    <NavLink className='fak-tits' to={`/faculty${id}/curses${getid}/grup`} > {curs}</NavLink>
                    <DoubleRightOutlined className='icon-lef' />
                    <div className='fak-name' > {grup}</div>
                </div>
                <div> {
                    timeTable === 200 ?
                        (
                            raspiysene.length > 0
                                ?
                                <BirinshiKun raspiysene={raspiysene} />
                                :
                                <div className='card mb-3 p-4  text-center ras' >
                                    Ushbu guruhda dars jadvali shakllantirilmagan!
                                </div>

                        )
                        :
                        <SkeletonLoading />
                }</div>

            </div>

        </>
    )
}

export default Raspiysene