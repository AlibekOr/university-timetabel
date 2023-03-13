import React from 'react'
import { NavLink, useParams } from "react-router-dom"
import { DoubleRightOutlined } from "@ant-design/icons"
import SkeletonLoading from '../skleton/SkletonLoading'
import axios from 'axios'
import "../raspiysene/birinshiKun/birinshiKun.scss"
const SerchM = () => {
    const { MgId } = useParams()
    const [kurs, setKurs] = React.useState([])
    const [searchInfo, setSearchInfo] = React.useState([])
    const [dataCode, setDataCode] = React.useState(0)

    const getSearchMug = async (MgId) => {
        try {
            const { data } = await axios.get(`https://schedule.allpro.uz/api/timetable:${MgId}/get`)
            setDataCode(data.code);
            setKurs(data.employee.name)
            const result = Object.values(data.timetable)
            setSearchInfo(result)
        } catch (error) {
            console.log(error.message);
        }
    }

    React.useEffect(() => {
        if (MgId) {
            getSearchMug(MgId)
        }

        return () => {
            setSearchInfo([])
        }
    }, [MgId]);

    return (
        <div className='inner-block con'>
            <div className='fak-inners fak-info'>
                <NavLink className="fak-tits" to='/'>
                    <i class="fa fa-home mx-3"></i>
                    BOSH SAHIFA
                </NavLink>
                <DoubleRightOutlined className='icon-lef' />
                <div className='fak-name'> {kurs === 0 ? "Dars jadvali" : kurs} </div>
            </div>
            <div className='MRasp iysene'>
                {searchInfo.length > 0 ? (
                    <div >
                        {searchInfo.map((item, i) => (
                            <div className='card innerHtml  mb-3  shadow-sm border' key={i}>
                                <div className='card-header'>{item.date}</div>
                                <div className="card-body">
                                    {
                                        item.data.map((itm, i) => (
                                            <div key={i} className="table-responsive  ">
                                                <table className='table  table-bordered text-center align-middle'>
                                                    <tbody>
                                                        <tr>
                                                            <td className="count-para">{i += 1}-para</td>
                                                            <td className="lessonName ingoGrup">
                                                                <span>{itm.lesson.name}</span>
                                                                <br />
                                                                <NavLink to={`/faculty${itm.faculty.id
                                                                    }/curses${itm.course.id}/grup${itm.group.id}/timetable`} className='groupNameI'>{itm.group.name}</NavLink>
                                                            </td>
                                                            <td>
                                                                <div className='small'>
                                                                    {itm.auditorium}
                                                                    <br />
                                                                    {itm.start_time}-{itm.end_time}
                                                                    <br />
                                                                    {itm.lesson.type}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                ) : dataCode === 0 ?
                    <SkeletonLoading />
                    :
                    <div className='card mb-3 p-4  text-center ras' >
                        Professor-o‘qituvchiga dars jadvali shakllantirilmagan!
                    </div>
                }
            </div>
        </div>
    )
}

export default SerchM