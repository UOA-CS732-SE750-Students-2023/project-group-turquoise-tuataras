import React from "react";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
    return (
        <React.Fragment>
            <div>
                <Outlet />
            </div>
        </React.Fragment>
    )
}