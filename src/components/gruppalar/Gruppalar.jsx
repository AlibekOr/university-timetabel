import React from 'react'
import { useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import "../fakultet/fakultet.scss"
import { DoubleRightOutlined, HomeFilled } from "@ant-design/icons"
import SkeletonLoading from '../skleton/SkletonLoading'

const Gruppalar = () => {
    const { id, getid } = useParams()
    const [grup, setGrup] = React.useState([])
    const [isLoding, setIsLoding] = React.useState(false)
    const [fakul, setFakul] = React.useState([])
    const [curs, setСurs] = React.useState([])

    const getGruppalar = async (id, getid) => {

        try {
            const { data } = await axios.get(`https://schedule.allpro.uz/api/faculty:${id}/course:${getid}/groups`)
            setIsLoding(true)
            if (data.code === 200) {

                setGrup(data.groups.data)
                setFakul(data.groups.faculty.name)
                setСurs(data.groups.course.name)

                setIsLoding(false)
            }
        } catch (error) {
            console.log(error);
            setIsLoding(false)
        }
    }

    React.useEffect(() => {
        if (id && getid) {
            getGruppalar(id, getid)
        }

        return () => {
            setGrup([])
        }
    }, [id, getid]);

    return (
        <div className='inner-block con'>
            <div className='fak-inners fak-info'>
                <NavLink className="fak-tits" to='/'>
                    <i className="fa fa-home mx-3"></i>
                    BOSH SAHIFA
                </NavLink>
                <DoubleRightOutlined className='icon-lef' />
                <NavLink className='fak-tits' to={`/faculty${id}/curses`}>{fakul}</NavLink>
                <DoubleRightOutlined className='icon-lef' />
                <div className='fak-name' > {curs}</div>
            </div>

            {
                grup.length > 0 ? (grup.map((item) => (
                    <div className='fak-inner card border shadow-sm' key={item.id}>
                        <NavLink className="card-body fak-tit" to={`/faculty${id}/curses${getid}/grup${item.id}/timetable`}>
                            {item.name}
                        </NavLink>
                    </div>
                ))) : <SkeletonLoading />
            }
        </div>
    )
}

export default Gruppalar