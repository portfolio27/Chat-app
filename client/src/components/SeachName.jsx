import { useState } from "react"

const SearchName = (props) => {

    const clicked = ()=> {
        props.selectUser(prevData=> {
            return props.findId
        })

        props.commonKey(prevData=> {
            return props.ckey;
        })

        props.setChatId(prevData=> {
            return props.chatId;
        })

        props.setIsActive(prevData=> {
            return true
        })

    }


    return (
        <div onClick={clicked}>
            {/* <h2>{props.name}</h2>
            <h5>{props.ckey}</h5>
            <h5>{props.chatId}</h5> */}

            <div className="row">
                <div className="col"><h4>{props.name}</h4></div>
            </div>
            <div className="row">
                <div className="col"><h5>{props.ckey}</h5></div>
            </div>
        </div>
    )
}

export default SearchName;