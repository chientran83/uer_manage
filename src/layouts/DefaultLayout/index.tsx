import { Outlet } from "react-router-dom";
import classNames from "classnames/bind"

import styles from "./DefaultLayout.module.scss"
import Header from "../components/Header";

const cx = classNames.bind(styles)

const DefaultLayout: React.FC = () => {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("content")}>
                <Outlet />
            </div>
        </div>
    )
}

export default DefaultLayout;

