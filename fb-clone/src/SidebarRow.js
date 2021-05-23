import { Avatar } from '@material-ui/core';
import React from 'react';
import "./SidebarRow.css";

function SidebarRow({ src, Icon, title }) {
    return (
        <div className="sidebarRow">
            {/* {src && <Avatar src={src}/>} means:
                If there is src then use src else use Icon
            */}
            {src && <Avatar src={src}/>}
            {Icon && <Icon />}
           <h4>{title}</h4>
        </div>
    );
}

export default SidebarRow;
