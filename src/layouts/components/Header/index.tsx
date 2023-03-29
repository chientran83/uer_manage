import { Layout, Menu } from 'antd'

import { menuItems } from '../../../services/constants/menuItems';

const Header: React.FC = () => {
    const { Header: AntdHeader } = Layout;
    return (
        <Layout>
            <AntdHeader>
                <Menu items={menuItems} mode="horizontal" theme="dark" />
            </AntdHeader>
        </Layout>
    )
}
export default Header;