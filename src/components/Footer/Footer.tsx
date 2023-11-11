import { Flex, Layout } from 'antd';
import styles from './Footer.module.scss';

function Footer() {
    return <Layout>
        <Flex className={styles.footerWrapper} vertical>
            <p>Get latest updates on <br/> new courses</p>
            <span>Become a member now!</span>
            <button className={styles.signUp}>Sign Up</button>
        </Flex>
    </Layout>
}

export default Footer;