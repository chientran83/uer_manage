import { NavLink } from 'react-router-dom'
import { Button as BtnAntd } from 'antd'
import classNames from 'classnames/bind'

import styles from './Button.module.scss'
import { ButtonType } from '../../../services/types/ButtonType'

const cx = classNames.bind(styles)

const Button = ({ type, to, children, shape,onClick,danger }: ButtonType) => {
    let BtnType : string | React.ComponentType<any> = "span"
    if(to){
        BtnType = NavLink
    }
    const props = {
        type,
        shape,
        onClick,
        danger
    }
    return (
        <BtnType to={to} className={cx('button')}>
            <BtnAntd {...props}>
                {children}
            </BtnAntd>
        </BtnType>
    )
}

export default Button;