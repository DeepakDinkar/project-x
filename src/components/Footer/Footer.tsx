import { Flex, Layout } from 'antd';
import './Footer.module.scss';

function Footer() {
    return <Layout>
        <Flex className='footer-wrapper' vertical>
            <p>Get latest updates on <br/> new courses</p>
            <span>Become a member now!</span>
            <button className='sign-up'>Sign Up</button>
        </Flex>
    </Layout>
}

export default Footer;