import { Fragment } from 'react';
import classes from './Layout.module.scss'

const Layout = (props) => {
    return (
        <Fragment>
            <main className={classes.mainLayout}>
                <section className={classes.mainLayout__mainSection}>
                    {props.children}
                </section>
            </main>
        </Fragment>
    );
};

export default Layout;
