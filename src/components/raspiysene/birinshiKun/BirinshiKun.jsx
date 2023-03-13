import React from "react"
import "./birinshiKun.scss"

const BirinshiKun = (raspiysene) => {
    const rezult = raspiysene.raspiysene
    return (
        <div>
            {
                rezult.map((item, vre) => (
                    <div key={vre}>
                        <div className="card mb-4 shadow">
                            <div className="card-header ">
                                <span className="cartHeadre">
                                    {item[0]}
                                </span>
                            </div>
                            <div className="card-body ">
                                <div className=" table-responsive">
                                    {
                                        item[1].map((itm, num) =>
                                        (

                                            <div key={itm.id}>
                                                <table className="table tableStyle mb-0 table-bordered align-middle">
                                                    <tbody>
                                                        <tr>
                                                            <td className="count-para">{num += 1}-para </td>
                                                            <td className="lessonName">{itm.lesson_name}</td>
                                                            <td className="oqitiwshi">
                                                                <span className="navLinkClass" >{itm.employee.name}</span>
                                                            </td>
                                                            <td className="infoItem small" >
                                                                <div className="" >
                                                                    {itm.auditorium}
                                                                </div>
                                                                <div className="" >
                                                                    {itm.start_time}-{itm.end_time}
                                                                </div>
                                                                <div className="" >
                                                                    {itm.lesson_type}
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
                        </div>

                    </div>
                ))

            }
        </div>
    )
}

export default BirinshiKun
