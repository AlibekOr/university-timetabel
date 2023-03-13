import React from 'react'
import axios from 'axios'
import { NavLink } from "react-router-dom"
import SkeletonLoading from '../skleton/SkletonLoading'
import "./fakultet.scss"

const Fakultet = () => {
    const [dizim, setDizim] = React.useState([])
    const [loding, setLoding] = React.useState(false)

    const getFakultet = async () => {
        try {
            const { data } = await axios.get(`https://schedule.allpro.uz/api/faculties`)
            setLoding(true)
            if (data.code === 200) {
                setDizim(data.faculties.data)
                setLoding(false)
            }
        } catch (error) {
            console.log(error)
            setLoding(false)
        }

    }
    React.useEffect(() => {
        getFakultet()
    }, [])

    return (
        <div className='inner-block con'>
            <div className="banner-headre " ></div>
            {
                dizim.length > 0 ?
                    (dizim.map((item, i) => (
                        <div className='fak-inner card border shadow-sm' key={item.id}>
                            <NavLink className="card-body fak-tit " to={`/faculty${item.id}/curses`}>{item.name} fakulteti</NavLink>
                        </div>)
                    )) : <SkeletonLoading />
            }
        </div>
    )
}

export default Fakultet